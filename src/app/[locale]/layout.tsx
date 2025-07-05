import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { strapiClient } from '@/lib/strapiClient';
import { generateMetadataObject } from '@/lib/metadata';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils'

type Props = {
    children: ReactNode;
    params: Promise<{ locale: Locale }>;
};

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
    const { locale } = await props.params;
    const globalApi = strapiClient.single('global');
    try {
        const { data } = await globalApi.find({
            locale: locale,
            populate: 'seo.metaImage',
        });
        return generateMetadataObject(data?.seo);
    } catch (error) {
        console.log(error);
        return generateMetadataObject(null);
    }
}

export default async function LocaleLayout({ children, params }: Props) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    setRequestLocale(locale);
    const globalApi = strapiClient.single('global');
    const { data } = await globalApi.find({
        locale: locale,
        populate: 'all',
    });
    return (
        <html className="h-full" lang={locale}>
            <ViewTransitions>
                <body className={cn(inter.className, 'bg-white antialiased h-full w-full')}>
                    <NextIntlClientProvider>
                        <Navigation
                            leftNavbarItems={data?.navbar.left_navbar_items}
                            rightNavbarItems={data?.navbar.right_navbar_items}
                            logo={data?.navbar.logo}
                            dropmenu={data?.dropmenu}
                        />
                        {children}
                        <Footer data={data?.footer} />
                    </NextIntlClientProvider>
                </body>
            </ViewTransitions>
        </html>
    );
}
