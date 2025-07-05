'use client';
import { useTranslations } from 'next-intl';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    AnimatePresence,
} from 'motion/react';
import { useState } from 'react';
import Image from 'next/image';
import { IoIosMenu } from 'react-icons/io';
import { IoIosClose } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { strapiImage as si } from '@/lib/strapiImage';
import { LocaleSwitcher } from './LocaleSwitcher';
import { NavigationLink } from './NavigationLink';
type Props = {
    leftNavbarItems: {
        URL: string;
        text: string;
        target?: string;
    }[];
    rightNavbarItems: {
        URL: string;
        text: string;
        target?: string;
    }[];
    logo: any;
    dropmenu: any;
};

export default function DesktopNavigation({
    leftNavbarItems,
    rightNavbarItems,
    logo,
    dropmenu,
}: Props) {
    const { scrollY } = useScroll();
    const [showBackground, setShowBackground] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [active, setActive] = useState(-1);
    const show = showBackground || showMenu;
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';

    useMotionValueEvent(scrollY, 'change', (value) => {
        if (value > 100) {
            setShowBackground(true);
        } else {
            setShowBackground(false);
        }
    });

    const t = useTranslations('Navigation');
    return (
        <motion.nav
            className={`w-full fixed left-0 top-0 z-10 ${
                show ? 'border-b-[1px] border-b-gray-200' : ''
            }`}
            initial={{
                backgroundColor: 'rgba(255,255,255,0)',
            }}
            animate={{
                backgroundColor: show
                    ? 'rgba(255,255,255,1)'
                    : 'rgba(255,255,255,0)',
            }}
            transition={{
                duration: 0.2,
            }}
            onMouseLeave={() => {
                setActive(-1);
                setShowMenu(false);
                setTimeout(() => {}, 1);
            }}
        >
            <div className="w-full box-border px-2 py-2 flex items-center justify-between mx-auto md:px-6 md:container">
                <div className="flex items-center">
                    <IoIosMenu className={`h-6 w-6  md:hidden ${show ? 'text-gray-800' : 'text-white'}`} />
                    <div className="w-10 h-10 relative md:mr-2">
                        <Image
                            src={si(logo?.image.url)}
                            alt={logo?.image.alternativeText}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                
                <div className="absolute md:flex md:grow md:items-center md:justify-start md:relative">
                     <IoIosClose className="h-6 w-6 md:hidden" />
                    <div className="block gap-2 md:flex md:grow md:items-center md:justify-start">
                        {leftNavbarItems.map((item, index) => (
                            <NavigationLink
                                key={`navigation-${index}`}
                                target={item.target}
                                href={item.URL}
                                show={show}
                                text={item.text}
                            />
                        ))}
                    </div>
                    <div className="md:flex md:items-center md:justify-start">
                        {rightNavbarItems.map((item, index) => (
                            <NavigationLink
                                key={`navigation-${index}`}
                                target={item.target}
                                href={item.URL}
                                show={show}
                                text={item.text}
                            />
                        ))}
                    </div>
                    <LocaleSwitcher show={show} />
                </div>

                <IoIosSearch className={`h-6 w-6 md:mr-3 ${show ? 'text-gray-800' : 'text-white'}`} />
                
            </div>
        </motion.nav>
    );
    // return (
    //     <div className="bg-slate-850">
    //         <nav className="container flex justify-between p-2 text-white">
    //             <div>
    //                 <NavigationLink href="/">{t('home')}</NavigationLink>
    //                 <NavigationLink href="/pathnames">
    //                     {t('pathnames')}
    //                 </NavigationLink>
    //             </div>
    //             <LocaleSwitcher />
    //         </nav>
    //     </div>
    // );
}
