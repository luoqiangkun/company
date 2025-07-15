// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { esClient } from '@/lib/elasticsearch';

type Article = {
    title: string;
    content: string;
    locale: string;
    category: string;
};

type ResultItem = {
    title: string;
    content: string;
    locale: string;
};

type ResultGroup = {
    category: string;
    list: ResultItem[];
};

function trimPunctuation(str: string): string {
  return str.replace(/^[\s，。、；：“”‘’（）—！？,.!:;"'()\[\]{}《》…\-]+|[\s，。、；：“”‘’（）—！？,.!:;"'()\[\]{}《》…\-]+$/g, '')
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { keyword, locale } = req.query;

    if (typeof keyword !== 'string' || typeof locale !== 'string') {
        return res
            .status(400)
            .json({ error: 'Missing or invalid keyword or locale' });
    }

    try {
        const result = await esClient.search<Article>({
            index: 'text', // 替换为你的索引
            size: 100, // 最多返回100条，你可以改成分页
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                locale: locale,
                            },
                        },
                        {
                            bool: {
                                should: [
                                    {
                                        match: {
                                            title: {
                                                query: keyword,
                                                analyzer: 'ik_max_word',
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            content: {
                                                query: keyword,
                                                analyzer: 'ik_max_word',
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            highlight: {
                pre_tags: ['<em>'],
                post_tags: ['</em>'],
                fields: {
                    title: {
                        fragment_size: 15,
                        number_of_fragments: 1,
                    },
                    content: {
                        fragment_size: 30,
                        number_of_fragments: 1,
                    },
                },
            },
        });

        // 对结果进行分组（按 category 分类）
        const grouped: Record<string, ResultGroup> = {};

        for (const hit of result.hits.hits) {
            const source = hit._source!;
            const highlight = hit.highlight || {};

            const category = source.category || '未分类';

            let title = highlight.title?.[0] ?? source.title;
            title = trimPunctuation(title);
            let content = highlight.content?.[0] ?? '';
            content = trimPunctuation(content);

            const item: ResultItem = {
                title,
                content,
                locale: source.locale,
            };

            if (!grouped[category]) {
                grouped[category] = { category, list: [] };
            }

            grouped[category].list.push(item);
        }

        // 返回数组格式
        const finalResult: ResultGroup[] = Object.values(grouped);

        res.status(200).json(finalResult);
    } catch (error: any) {
        console.error(
            'Elasticsearch query error:',
            error.meta?.body?.error || error.message
        );
        res.status(500).json({ error: 'Search failed' });
    }
}
