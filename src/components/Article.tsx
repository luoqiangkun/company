
import { IArticle, ILinkImage } from "@/lib/type";
import Image from "next/image";
import { strapiImage } from "@/lib/strapiImage";

type Category = {
    id:Number;
    text: string;
}

type Props = {
    image: ILinkImage;
    category: Category[];
    data: IArticle[];
}

export const Article = ({ image, data, category }: Props) => {
    {{ image }}
    return (
        <div className="mt-14">
            <div className="relative w-full">
                <Image
                    src={strapiImage(image.image.url)}
                    alt={image.image.alternativeText}
                    width={1600} // 原始宽度（任意值，仅用于比例计算）
                    height={900} // 原始高度（与宽度保持原始比例）
                    layout="responsive"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-center items-center py-6 text-2xl gap-6 text-gray-800">
                    {
                        category.map((item,index) => {
                           return  <span key={index}>{item.text}</span>
                        })
                    }
                    
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        data.map( (item,index) => {
                            return (
                                <a key={index} className="group flex flex-col focus:outline-hidden" href={`/article/${item.slug}`}>
                                    <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                                        <Image 
                                            className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" 
                                            src={strapiImage(item?.image.url)} 
                                            alt={item?.image.alternativeText} 
                                            fill
                                            />
                                    </div>

                                    <div className="mt-7">
                                        <h3 className="text-ml font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
                                        { item.title}
                                        </h3>
                                        <p className="mt-3 text-gray-800 dark:text-neutral-200">
                                        { item.description }
                                        </p>
                                        <p>Jul 9, 2025</p>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
};

export default Article;