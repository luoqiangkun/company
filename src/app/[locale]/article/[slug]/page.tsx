import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { strapiClient } from '@/lib/strapiClient';
import ArticleDetail from '@/components/ArticleDetail';
type Props = {
    params: Promise<{ locale: Locale, slug: string }>;
};


export default async function ArticleDetailPage({ params }: Props) {
    const { locale ,slug } = await params;
    setRequestLocale(locale);
    const articleApi = strapiClient.collection('articles');
    try {
        const result = await articleApi.find({
            locale: locale,
            populate: 'all',
            filters: {
                slug: slug
            }
        });
        const data = result?.data[0];
        console.log( data );
        return (
            <ArticleDetail data={data}/>
        )
    } catch (error) {
        console.log( error )
        //edirect('/en');
    }
}
