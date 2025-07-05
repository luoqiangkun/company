import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { NavigationLink } from './NavigationLink';

export const LocaleSwitcher = ({ show }: { show? : boolean }) =>  {
    const locale = useLocale();
    const pathname = usePathname(); 
    return routing.locales.map((value) => (
        <NavigationLink
            key={`locale-${value}`}
            target='_self'
            href={pathname}
            show={show}
            text={value}
        />
    ));
}
