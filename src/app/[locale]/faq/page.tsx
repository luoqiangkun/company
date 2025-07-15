import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { strapiClient } from '@/lib/strapiClient';
import Faq from '@/components/Faq';
type Props = {
    params: Promise<{ locale: Locale }>;
};


export default async function FaqPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const pageApi = strapiClient.collection('faqs');
    try {
        const {data} = await pageApi.find({
            locale: locale
        });
        return (
            <Faq data={data}/>
        )
    } catch (error) {
        console.log( error )
        //edirect('/en');
    }
}
