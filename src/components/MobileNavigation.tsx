'use client';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    AnimatePresence,
} from 'motion/react';
import { useState } from 'react';
import Image from 'next/image';
import { strapiImage as si, strapiImage } from '@/lib/strapiImage';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { IImage, ILink, ILinkImage } from '@/lib/type';
import { useLocale } from 'next-intl';

type Props = {
    leftNavBar: Navbar[];
    rightNavBar: Navbar[];
    logo: ILinkImage;
};


type Component = {
    id: number;
    __component: string;
    category?: string;
    content? : ILink[];
    URL?: string;
    target?: string;
    description?: string;
    image?: IImage
}

type MenuZone = {
    id: number;
    content: Component[];
}


type Navbar = {
    id: number;
    text: string;
    type: string;
    link?: ILink;
    menuZone?: MenuZone
}


export default function MobileNavigation({
    leftNavBar,
    rightNavBar,
    logo,
}: Props) {
    const { scrollY } = useScroll();
    const [ showBackground, setShowBackground] = useState(false);
    const [ showMenu, setShowMenu ] = useState(false);
    const [ showIcon, setShowIcon ] = useState(false);
    const [ navId, setNavId ] = useState( -1 );
    const [ menuId, setMenuId ] = useState( -1 );
    const pathname = usePathname();
    const nabBarList = [...leftNavBar,...rightNavBar]

    useMotionValueEvent(scrollY, 'change', (value) => {
        if (value > 100) {
            setShowBackground(true);
        } else {
            setShowBackground(false);
        }
    });

    const handleNav = (id: number) =>{
       if( id == navId ){
            setNavId(-1);
       } else {
            setNavId(id);
       }
    };

    const handleMenu = (id: number) =>{
       if( id == menuId ){
            setMenuId(-1);
       } else {
            setMenuId(id);
       }
    };


    return (
        <>
        <motion.header
            className={`fixed left-0 top-0 z-10 w-full lg:hidden ${showBackground ? 'text-gray-800' : 'text-white'}`}
        >
            <motion.div
                className={`flex items-center justify-between ${
                    showBackground ? 'border-b-[1px] border-b-gray-200 drop-shadow-xs' : ''
                }`}
                initial={{
                    backgroundColor: 'rgba(255,255,255,0)',
                }}
                animate={{
                    backgroundColor: showBackground
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(255,255,255,0)',
                }}
                transition={{
                    duration: .2,
                }}
                
            >
                <div className='w-10 h-10 flex items-center justify-center' onClick={() => {setShowMenu(true);setShowIcon(true)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </div>

                <div className="w-10 h-10 relative">
                    <Image
                        src={si(logo?.image.url)}
                        alt={logo?.image.alternativeText}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>

            </motion.div>
        </motion.header>
        <AnimatePresence>
        {
            showMenu &&  
            <motion.div className="fixed left-0 top-0 w-screen h-screen z-10 bg-white text-gray-800"
                initial={{ opacity: 0}}
                animate={{ opacity: 1 }}
                transition={{duration: .2}}
                exit={{ opacity: 0 }}
            >
                <div className="flex items-center justify-between">
                    <div className='w-10 h-10'>
                    <AnimatePresence onExitComplete={() => setShowMenu(false)}>
                    {showIcon && (
                        <motion.div 
                            className="size-full flex items-center justify-center"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1 }}
                            transition={{duration: .1}}
                            exit={{ opacity: 0}}
                            onClick={() => {setShowIcon(false)}}
                            >
                            <motion.svg 
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </motion.svg>
                        </motion.div>
                    )}
                    </AnimatePresence>
                     </div>

                    <div className="w-10 h-10 relative">
                        <Image
                            src={si(logo?.image.url)}
                            alt={logo?.image.alternativeText}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="w-10 h-10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>

                </div>


                <div className="px-4 py-4">
                    {nabBarList.map((navbar, index) => (
                        navbar.type == 'menu' ? 
                        <div 
                            key={navbar.id}
                            className='py-2'
                        >
                            <div className='flex justify-between items-center' onClick={() => {handleNav(navbar.id)}}>
                                <span>{navbar.text}</span>
                                    <div className={`transition-transform duration-300 ${navId == navbar.id ? 'rotate-90' : 'rotate-0'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>

                            <motion.div
                                className='pt-2 overflow-hidden'
                                initial={{height: 0}}
                                animate={{height: navId == navbar.id ? 'auto' : 0}}
                            >
                            {

                                navbar.menuZone?.content.map( (menu,key) => {
                                    return (
                                        menu.__component == 'shared.menu' ? 
                                        <div key={menu.id} className='pl-4 py-2' onClick={() => {handleMenu(menu.id)}}>
                                            <div className='flex justify-between items-center'>
                                                <span>{menu.category}</span>
                                                <div className={`transition-transform duration-300 ${menuId == menu.id ? 'rotate-90' : 'rotate-0'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <motion.div className='pl-4 pt-2 overflow-hidden'
                                                initial={{height: 0}}
                                                animate={{height: menuId == menu.id ? 'auto' : 0}}
                                            >
                                            {
                                               menu.content && menu.content.map( (link) => {
                                                    return <Link
                                                        className='block py-2'
                                                        key={`link-${link.id}`}
                                                        target={link.target}
                                                        href={link.href}
                                                    >
                                                        {link.text}
                                                    </Link>   
                                                })
                                            }
                                            </motion.div>
                                        </div>
                                        :
                                        // <Image 
                                        //     className='w-48 pt-2 '
                                        //     src={menu.image?.url ? strapiImage(menu.image?.url) : ''}
                                        //     alt={menu.image?.alternativeText ? menu.image?.alternativeText : ''}
                                        //     width={2252}
                                        //     height={2888}
                                        // />
                                        ''
                                    )
                                })
                            }
                            </motion.div>
                        </div>
                        :
                        (
                        navbar.link && 
                            <Link
                            key={`menu-${index}`}
                            className={`px-2 py-2 flex items-center relative`}
                            target={navbar?.link.target}
                            href={navbar.link.href}
                        >
                            {navbar.link?.text}
                            
                        </Link>   
                        )
                    ))}
                    <div className='py-2'>
                         <div className='flex justify-between items-center' onClick={() => {handleNav(-2)}}>
                            <span>语言</span>
                                <div className={`transition-transform duration-300 ${navId == -2 ? 'rotate-90' : 'rotate-0'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                        <motion.div
                            className='pt-2 overflow-hidden'
                            initial={{height: 0}}
                            animate={{height: navId == -2 ? 'auto' : 0}}
                        >
                            {
                            routing.locales.map( (value) => {
                                return (
                                <Link
                                    key={value}
                                    className='block py-2'
                                    target='_self'
                                    href={`/${value}/${pathname}`}
                                >
                                    {value}
                                </Link>   
                                )
                            })
                        }
                        </motion.div>
                    </div>
                </div>

            </motion.div>
        }
        </AnimatePresence>
        </>
    );
}
