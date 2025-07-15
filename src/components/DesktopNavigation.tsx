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
import { LocaleSwitcher } from './LocaleSwitcher';
import { useLayout } from '@/content/LayoutContext';
import { Link } from '@/i18n/navigation';
import { IImage, ILink, ILinkImage } from '@/lib/type';
import DesktopSearch from './DesktopSearch';

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


export default function DesktopNavigation({
    leftNavBar,
    rightNavBar,
    logo,
}: Props) {
    const { layout } = useLayout();
    const { scrollY } = useScroll();
    const [ showBackground, setShowBackground] = useState(layout !== 'index');
    const [ showMenu, setShowMenu ] = useState(false);
    const [ showSearch, setShowSearch ] = useState(false);
    const [ navigationId, setNavigationId ] = useState( 0 );
    const [ menuZone, setMenuZone ] = useState<MenuZone>();
    const [ navMenuId, setNavMenuId ] = useState(-1);

    useMotionValueEvent(scrollY, 'change', (value) => {
        if(layout == 'index'){
            if (value > 100) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }
    });


    const handleMenu = (menuZone?: MenuZone) =>{
        if(navMenuId != navigationId){
            if(menuZone){
                setShowMenu(true);
                setMenuZone(menuZone);
            }
        } else {
            if(showMenu){
                setShowMenu(false);
            } else {
                if(menuZone){
                    setShowMenu(true);
                    setMenuZone(menuZone);
                }
            }
        }
        setNavMenuId(navigationId);
    };

    return (
        <>
        <motion.nav
            className={`fixed left-0 top-0 z-10 w-full hidden lg:block ${showBackground ? 'text-gray-800' : 'text-white'}`}
            onMouseEnter={() => {setShowBackground(true)}}
            onMouseLeave={() => {
                if(!showMenu){
                    layout === 'index' && setShowBackground(false);
                    setNavigationId(-1);
                }
            }} 
        >
            <motion.div
                className={`w-full ${
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
                    duration: .5,
                }}
                
            >
                <div className="container m-auto box-border px-4 py-2 flex items-center justify-between mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 relative">
                            <Image
                                src={si(logo?.image.url)}
                                alt={logo?.image.alternativeText}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {leftNavBar.map((navbar, index) => (
                            navbar.type == 'menu' ? 
                            <div 
                                key={`navigation-${index}`}
                                className='px-2 py-2 flex items-center relative cursor-pointer'
                                onMouseEnter={() => {setNavigationId(navbar.id)}}
                                onClick={() => handleMenu(navbar.menuZone)}
                                >
                                {navbar.text}
                                 <div
                                className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 scale-x-0 origin-center transition-transform duration-300 ${
                                    navigationId == navbar.id ? "scale-x-100" : ""
                                }`}
                                ></div>
                            </div>
                            :
                            (
                            navbar.link && 
                                <Link
                                key={`navigation-${navbar.id}`}
                                className={`px-2 py-2 flex items-center relative`}
                                target={navbar?.link.target}
                                href={navbar.link.href}
                                onMouseEnter={() => {setNavigationId(navbar.id)}}
                            >
                                {navbar.link?.text}
                                
                                <div
                                className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 scale-x-0 origin-center transition-transform duration-300 ${
                                    navigationId == navbar.id ? "scale-x-100" : ""
                                }`}
                                ></div>
                            </Link>   
                            )
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                            className="size-6 cursor-pointer"
                            onClick={() => { setShowSearch(true) }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        {rightNavBar.map((navbar, index) => (
                            navbar.type == 'menu' ? 
                            <div 
                                key={`navigation-${index}`}
                                className='px-2 py-2 flex items-center relative cursor-pointer'
                                onMouseEnter={() => {setNavigationId(navbar.id)}}
                                onClick={() => handleMenu(navbar.menuZone)}
                                >
                                {navbar.text}
                                 <div
                                className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 scale-x-0 origin-center transition-transform duration-300 ${
                                    navigationId == navbar.id ? "scale-x-100" : ""
                                }`}
                                ></div>
                            </div>
                            :
                            (
                                navbar.link && 
                                 <Link
                                    key={`navigation-${navbar.id}`}
                                    className={`px-2 py-2 flex items-center relative`}
                                    target={navbar?.link.target}
                                    href={navbar.link.href}
                                    onMouseEnter={() => {setNavigationId(navbar.id)}}
                                >
                                    {navbar.link?.text}
                                    
                                    <div
                                    className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 scale-x-0 origin-center transition-transform duration-300 ${
                                        navigationId == navbar.id ? "scale-x-100" : ""
                                    }`}
                                    ></div>
                                </Link>   
                            )
                        )
                        )}
                        <LocaleSwitcher show={showBackground} />
                    </div>
                </div>
            </motion.div>

            <AnimatePresence mode='wait'>
                {
                    showMenu && menuZone &&
                    <motion.div
                        className='w-full bg-white'
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{
                            duration: .5
                        }}
                    >
                        <div className='container box-border m-auto flex gap-15 px-20 py-4'>
                            {
                                menuZone.content.map( (component,index) => {
                                    console.log( component )
                                    return (
                                        component.__component == 'shared.menu' 
                                        ?
                                        <div key={`shared.menu-${index}`} className='w-32'>
                                            <div>{component.category}</div>
                                            {
                                                component.content && component.content.map( (link,key) => {
                                                    return  <Link
                                                        key={`link-${key}`}
                                                        className={`block py-2 cursor-pointer`}
                                                        target={link.target}
                                                        href={link.href}
                                                    >
                                                        {link?.text}
                                                        
                                                    </Link>
                                                })
                                            }
                                        </div>
                                        :
                                        ( 
                                            component.image &&
                                            <div key={`shared.image-${index}`} className='relative w-40'>
                                            <Image 
                                                className='bg-cover'
                                                src={strapiImage( component.image.url )}
                                                alt={component.image.alternativeText}
                                                layout="responsive"
                                                width={2252}
                                                height={2888}
                                            />
                                            <div>{component.description}</div>
                                        </div>
                                        )
                                    )
                                })
                            }
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </motion.nav>
        
        <DesktopSearch open={showSearch} close={() => { setShowSearch(false)}} />
        </>
    );
}
