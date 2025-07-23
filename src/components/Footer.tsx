import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { IImage, ILink, ILinkImage } from '@/lib/type';
import { strapiImage } from '@/lib/strapiImage';

type Menu = {
    id: number;
    category: string;
    content: ILink[];
};

type Props = {
    logo: IImage;
    menu: Menu[];
    description: string;
    copyright: string;
};

export const Footer = ({ logo, menu, description, copyright }: Props) => {
    return (
        <div className="container mx-auto px-4 pt-4 lg:pt-16 text-gray-800">
            <div className="mb-8 lg:flex lg:justify-between">
                <div className="lg:max-w-lg">
                    <Link
                        className="inline-flex items-center"
                        target={logo.alternativeText}
                        href={'/'}
                    >
                        <Image
                            className="size-10"
                            src={strapiImage(logo.url)}
                            alt={logo.alternativeText}
                            width={100}
                            height={100}
                        />

                        <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                            Company
                        </span>
                    </Link>

                    <div className="mt-4 lg:max-w-sm">
                        {description}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0 lg:flex lg:justify-between lg:min-w-3xl">
                    {menu.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <p className="font-semibold tracking-wide">
                                    {item.category}
                                </p>
                                <ul className="mt-2 space-y-2">
                                    {item.content.map((link, key) => {
                                        return (
                                            <Link
                                                key={link.id}
                                                className="block pt-2 transition-colors duration-300 hover:text-deep-purple-accent-400"
                                                target={link.target}
                                                href={
                                                    link.URL ? link.URL : '/'
                                                }
                                            >
                                                {link.text}
                                            </Link>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="pt-5 pb-10 border-t border-neutral-300 text-center  text-gray-600">
                {copyright}
            </div>
        </div>
    );
};

export default Footer;
