import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link';
export const LocaleSwitcher = ({ show }: { show? : boolean }) =>  {
    const locale = useLocale();
    const pathname = usePathname(); 
    return (
        <Menu>
            <MenuButton className="inline-flex items-center gap-2 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                {locale}
            </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-40 mt-3 z-100 origin-top-right shadow-lg bg-white p-1 text-sm/6 text-gray-800 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
            {
                routing.locales.map( (value) => {
                    return (
                         <MenuItem>
                            <Link
                                key={value}
                                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10`}
                                target='_self'
                                href={pathname == value ? `/${value}` : `/${value}/${pathname}`}
                            >
                                {value}
                            </Link>   

                        </MenuItem>
                    )
                })
            }
        </MenuItems>
      </Menu>
    )
    // const locale = useLocale();
    // const pathname = usePathname(); 
    // return routing.locales.map((value) => (
    //     <NavigationLink
    //         key={`locale-${value}`}
    //         target='_self'
    //         href={pathname}
    //         show={show}
    //         text={value}
    //     />
    // ));
}
