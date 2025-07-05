

import { strapiImage } from "@/lib/strapiImage";
import Image from "next/image";
import { IImage } from '@/lib/type'

type Props = {
    image: IImage;
};

export const Banner = ({ image }: Props) => {
    if (image) {
        return (
            <div className="relative w-screen h-screen overflow-hidden z-0">
                <Image 
                    className="object-cover"
                    src={strapiImage(image.url)}
                    alt={image.alternativeText}
                    fill
                />
            </div>
        );
    }
    return;
};
