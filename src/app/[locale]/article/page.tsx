import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { strapiClient } from '@/lib/strapiClient';
import Article from '@/components/Article';
import { generateMetadataObject } from '@/lib/metadata';
import { IImage } from '@/lib/type';
type Props = {
    params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
    const { locale } = await props.params;
    const pageApi = strapiClient.collection('pages');
    try {
        const result = await pageApi.find({
            locale: locale,
            filters: {
                slug: 'article'
            },
            populate: "seo",
        });
        const data = result?.data[0];
        return generateMetadataObject(data?.seo);
    } catch (error) {
        console.log( error )
        return generateMetadataObject(null);
    }
}

export default async function ArticlePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const pageApi = strapiClient.collection('pages');
    const articleApi = strapiClient.collection('articles');
    const categoryApi = strapiClient.collection('categories');

    try {
        const page = await pageApi.find({
            locale: locale,
            filters: {
                slug: 'article'
            },
            populate: 'all'
        });

        const image = page.data[0].content.filter( item => item['__component'] == 'shared.image')[0];
        const { data } = await articleApi.find({
            locale: locale,
            populate: 'all'
        });

        const categories = await categoryApi.find({
            locale: locale,
            populate: 'all'
        });

        const category = categories.data? categories.data: [];
        
        return (
            <Article image={image} data={data} category={category}/>
        )
    } catch (error) {
        console.log( error )
        //edirect('/en');
    }
}
