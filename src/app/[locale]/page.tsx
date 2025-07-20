import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { strapiClient } from '@/lib/strapiClient';
import { generateMetadataObject } from '@/lib/metadata';
import DynamicZone from '@/components/DynamicZone'
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
                slug: 'homepage'
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

export default async function IndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const pageApi = strapiClient.collection('pages');
    try {
        const result = await pageApi.find({
            locale: locale,
            populate: 'all',
            filters: {
                slug: 'homepage'
            }
        });
        const data = result?.data[0];
        console.log( data )
        return data ? (
            <>
                <DynamicZone data={data?.content}></DynamicZone>
            </>
        ) : (<></>);
    } catch (error) {
        console.log( error )
        //edirect('/en');
    }
}
