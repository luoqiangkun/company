import { IArticle, ILinkImage } from '@/lib/type';
import Image from 'next/image';
import striptags from 'striptags';
import { strapiImage } from '@/lib/strapiImage';
import { Link } from '@/i18n/navigation';
import { it } from 'node:test';

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

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString)
        const month = date.getMonth() + 1 // 月份是从 0 开始的
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}月${day}，${year}`
    }


    return (
        <div className="max-w-7xl mt-14 px-4 mx-auto lg:mt-18">
            <section className="pt-6 bg-white lg:pt-8 mx-auto dark:bg-gray-900">
                <h1 className="hidden text-3xl font-semibold text-gray-800 capitalize pb-4 lg:block lg:text-4xl dark:text-white">
                    新闻
                </h1>
                <Link
                    className="my-4 block lg:flex"
                    href={`/article/${article.slug}`}
                >
                    <div className="relative lg:w-1/2 overflow-hidden bg-gray-100 rounded-lg shadow aspect-video dark:bg-gray-800">
                        <Image
                            className="size-full object-cover hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xs"
                            src={strapiImage(article?.image.url)}
                            alt={article?.image.alternativeText}
                            fill
                        />
                    </div>

                    <div className="flex flex-col-reverse mt-2 relative md:flex-col lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        <div className="flex space-x-2 items-center">
                            <p className="text-sm uppercase">{article.category?.text} /</p>
                            <p className="text-neutral-500 text-sm max-w-xl group-hover:text-white transition duration-200">
                                {formatDate(article.publishedAt)}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-800 hover:underline dark:text-white md:text-xl md:mt-2">
                               {article.title}
                            </p>

                            <p className="text-sm text-muted line-clamp-2 md:text-base md:mt-2 md:line-clamp-8">
                                {striptags(article.content)}
                            </p>
                        </div>

                        <span className="hidden absolute bottom-0 text-blue-500 underline hover:text-blue-400 lg:inline-block">
                            Read more
                        </span>
                    </div>
                </Link>
            </section>

            <section className="grid md:gap-4 md:grid-cols-2 lg:mt-8 lg:gap-8 lg:grid-cols-3">
                {data.map((item, index) => {
                    return (
                        <div key={`div-${index}`} className="my-4">
                            <Link
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

                                <div className="mt-2 flex flex-col justify-between">
                                    <p className="text-lg font-semibold text-gray-800 hover:underline dark:text-white md:text-xl md:mt-2">
                                       {item.title}
                                    </p>
                                    <p className="text-sm text-muted line-clamp-2 md:text-base md:mt-2">
                                       {striptags(item.content)}
                                    </p>
                                    <div className="flex space-x-2 items-cente md:mt-2">
                                        <p className="text-sm  uppercase">
                                            {item.category?.text}  /
                                        </p>
                                        <p className="text-neutral-500 text-sm max-w-xl group-hover:text-white transition duration-200">
                                            {formatDate(item.publishedAt)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default Article;
