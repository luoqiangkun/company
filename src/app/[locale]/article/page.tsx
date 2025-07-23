import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { API } from '@strapi/client';

import { strapiClient } from '@/lib/strapiClient';
import Article from '@/components/Article';
import { generateMetadataObject } from '@/lib/metadata';
import { IArticle, ICategory } from '@/lib/type';
type Props = {
    params: Promise<{ locale: Locale }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }> ;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
    const { locale } = await props.params;
    const pageApi = strapiClient.collection('pages');
    try {
        const result = await pageApi.find({
            locale: locale,
            filters: {
                slug: 'article',
            },
            populate: 'seo',
        });
        const data = result?.data[0];
        return generateMetadataObject(data?.seo);
    } catch (error) {
        console.log(error);
        return generateMetadataObject(null);
    }
}

export default async  function ArticlePage({ params, searchParams }: Props) {
    const { locale } = await params;
    const query = await searchParams;
    const page = Number(query.page || '1');
    const category = query.category || null;
    setRequestLocale(locale);
    const articleApi = strapiClient.collection('articles');
    try {
        const { data, meta } = await articleApi.find({
            locale: locale,
            populate: 'all',
            pagination: {
                page: page,
                pageSize: 7,
            },
        });
        const articles = data as unknown as IArticle[];
        const pagination = meta.pagination as API.Pagination;
        let cate: ICategory | null = null;
        if (category) {
            const categoryApi = strapiClient.single('categories/' + category);
            const { data } = await categoryApi.find({
                locale: locale,
                populate: 'all',
            });
            cate = data as ICategory;
        }
        return (
            <Article data={articles} pagination={pagination} category={cate} />
        );
    } catch (error) {
        console.log(error);
        //edirect('/en');
    }
}
