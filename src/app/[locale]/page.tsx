import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { use } from 'react';
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
        const { data } = await pageApi.find({
            locale: locale,
            filters: {
                slug: 'homepage',
            },
            populate: "seo.metaImage",
        });
        const [ item ] = data;
        return generateMetadataObject(item?.seo);
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
            filters: {
                slug: 'homepage',
            },
        });
        const [ data ] = result.data;
        return data ? (
            <DynamicZone data={data?.dynamic_zone}></DynamicZone>
        ) : (<></>);
    } catch (error) {
        console.log( error )
        redirect('/en');
    }
}
