
import { IImage, ILink, ILinkImage } from '@/lib/type';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

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

export default function Navigation({
    leftNavBar,
    rightNavBar,
    logo,
}: Props) {
    return (
        <>
        <DesktopNavigation logo={logo} leftNavBar={leftNavBar} rightNavBar={rightNavBar} />
        <MobileNavigation logo={logo} leftNavBar={leftNavBar} rightNavBar={rightNavBar}/>
        </>
    );
}
