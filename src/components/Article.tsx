import { IArticle, ILinkImage } from '@/lib/type';
import Image from 'next/image';
import { strapiImage } from '@/lib/strapiImage';

type Category = {
    id: Number;
    text: string;
};

type Props = {
    image: ILinkImage;
    category: Category[];
    data: IArticle[];
};

export const Article = ({ image, data, category }: Props) => {
    let article = data[0];
    return (
        <div className="max-w-7xl mt-14 px-4 mx-auto">
            <section className="bg-white pt-8 mx-auto dark:bg-gray-900">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                    新闻
                </h1>

                <div className="mt-8 lg:flex">
                    <div className="relative lg:w-1/2 overflow-hidden bg-gray-100 rounded-lg shadow aspect-video dark:bg-gray-800">
                        <Image
                            className="size-full object-cover hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xs"
                            src={strapiImage(article?.image.url)}
                            alt={article?.image.alternativeText}
                            fill
                        />
                    </div>

                    <div className="relative mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        <div className="flex space-x-2 items-center">
                            <p className="text-sm uppercase">
                                category /
                            </p>
                            <p className="text-neutral-500 text-sm max-w-xl group-hover:text-white transition duration-200">
                                September 11, 2024
                            </p>
                        </div>

                        <div>
<a
                            href="#"
                            className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl"
                        >
                            All the features you want to know
                        </a>

                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iure veritatis sint autem nesciunt, laudantium
                            quia tempore delect
                        </p>
                        </div>
                        

                        <a
                            className="absolute bottom-0 inline-block text-blue-500 underline hover:text-blue-400"
                            target="_blank"
                        >
                            Read more
                        </a>
                    </div>
                </div>
            </section>

            <section className="grid mt-8 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((item, index) => {
                    return (
                        <div key={`div-${index}`} className="py-4">
                            <a
                                key={index}
                                className="block focus:outline-hidden"
                                href={`/article/${item.slug}`}
                            >
                                <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg shadow aspect-[16/12] dark:bg-gray-800">
                                    <Image
                                        className="object-cover hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xs"
                                        src={strapiImage(item?.image.url)}
                                        alt={item?.image.alternativeText}
                                        fill
                                        sizes="100vw"
                                    />
                                </div>

                                <div className="py-4 flex flex-col justify-between">
                                    <p className="block mt-4 text-lg font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                                        Not a Guide to Integrating Strapi
                                    </p>
                                    <p className="text-left text-sm mt-2 text-muted md:text-base">
                                        Looking to streamline your content your
                                        your
                                    </p>
                                    <div className="flex space-x-2 items-center mt-4">
                                        <p className="text-sm  uppercase">
                                            category /
                                        </p>
                                        <p className="text-neutral-500 text-sm max-w-xl group-hover:text-white transition duration-200">
                                            September 11, 2024
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    );
                })}

                {data.map((item, index) => {
                    return (
                        <div key={`div-${index}`} className="py-4">
                            <a
                                key={index}
                                className="block focus:outline-hidden"
                                href={`/article/${item.slug}`}
                            >
                                <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg shadow aspect-[16/12] dark:bg-gray-800">
                                    <Image
                                        className="object-cover hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xs"
                                        src={strapiImage(item?.image.url)}
                                        alt={item?.image.alternativeText}
                                        fill
                                        sizes="100vw"
                                    />
                                </div>

                                <div className="py-4 flex flex-col justify-between">
                                    <p className="block mt-4 text-lg font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                                        Not a Guide to Integrating Strapi
                                    </p>
                                    <p className="text-left text-sm mt-2 text-muted md:text-base">
                                        Looking to streamline your content your
                                        your
                                    </p>
                                    <div className="flex space-x-2 items-center mt-4">
                                        <p className="text-sm text-blue-500 uppercase">
                                            category /
                                        </p>
                                        <p className="text-neutral-500 text-sm max-w-xl group-hover:text-white transition duration-200">
                                            September 11, 2024
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default Article;
