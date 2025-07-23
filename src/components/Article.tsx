import { IArticle, ICategory } from '@/lib/type';
import Image from 'next/image';
import striptags from 'striptags';
import { strapiImage } from '@/lib/strapiImage';
import { Link } from '@/i18n/navigation';
import { API } from '@strapi/client';

type Props = {
    category: ICategory | null;
    data: IArticle[];
    pagination: API.Pagination;
};

export const Article = ({ data, category, pagination }: Props) => {
    let article = data.shift();

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        const month = date.getMonth() + 1; // 月份是从 0 开始的
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}月${day}，${year}`;
    };

    return (
        <div className="max-w-7xl mt-14 px-4 mx-auto lg:mt-18">
            <section className="mx-auto dark:bg-gray-900">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize py-4 block md:py-6 lg:py-8 md:text-3xl lg:text-4xl dark:text-white">
                    新闻
                    {category && (
                        <Link href={`/article?category=${category.documentId}`}>
                            &nbsp;/&nbsp;{category.text}
                        </Link>
                    )}
                </h1>
                <Link
                    className="block mb-8 lg:flex"
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
                            <p className="uppercase">
                                {article.category?.text} /
                            </p>
                            <p className="text-neutral-500 max-w-xl group-hover:text-white transition duration-200">
                                {formatDate(article.publishedAt)}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-800 hover:underline dark:text-white md:text-xl md:mt-2">
                                {article.title}
                            </p>

                            <p className="text-muted line-clamp-2 md:text-base md:mt-2 md:line-clamp-8">
                                {striptags(article.content)}
                            </p>
                        </div>

                        <span className="hidden absolute bottom-0 text-blue-500 underline hover:text-blue-400 lg:inline-block">
                            阅读更多
                        </span>
                    </div>
                </Link>
            </section>

            <section className="grid md:gap-4 md:grid-cols-2 lg:gap-8 lg:grid-cols-3">
                {data.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            className="block mb-8 focus:outline-hidden"
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
                                <p className="text-muted line-clamp-2 md:text-base md:mt-2">
                                    {striptags(item.content)}
                                </p>
                                <div className="flex space-x-2 items-cente md:mt-2">
                                    <p className="uppercase">
                                        {item.category?.text} /
                                    </p>
                                    <p className="text-neutral-500 max-w-xl group-hover:text-white transition duration-200">
                                        {formatDate(item.publishedAt)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </section>

            <nav className="my-12">
                <div className="relative text-center px-12">
                    {pagination.page != 1 && (
                        <Link
                            className="w-10 h-10 absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-lg bg-slate-50 text-slate-700 rounded-full transition duration-300 hover:bg-primary hover:text-blue-500 hover:shadow-button"
                            href={`/article?page=${pagination.page - 1}${category ? '&category=' + category.documentId : ''}`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M19.714 12c0 0.533-0.432 0.964-0.964 0.964v0h-11.172l4.14 4.138c0.175 0.175 0.283 0.416 0.283 0.683 0 0.533-0.432 0.965-0.965 0.965-0.267 0-0.508-0.108-0.683-0.283v0l-5.785-5.785c-0.175-0.175-0.283-0.416-0.283-0.683s0.108-0.508 0.283-0.683l5.785-5.785c0.175-0.175 0.416-0.283 0.683-0.283 0.533 0 0.965 0.432 0.965 0.965 0 0.267-0.108 0.508-0.283 0.683v0l-4.14 4.138h11.172c0.533 0 0.964 0.432 0.964 0.964v0z"></path>
                            </svg>
                        </Link>
                    )}

                    <span
                        className="text-slate-500 uppercase tracking-wider"
                        aria-current="page"
                    >
                        {pagination.page} / {pagination.pageCount} 页
                    </span>
                    {pagination.page < pagination.pageCount && (
                        <Link
                            className="w-10 h-10 absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-lg bg-slate-50 text-slate-700 rounded-full transition duration-300 hover:bg-primary hover:text-blue-500 hover:shadow-button"
                            href={`/article?page=${pagination.page + 1}${category ? '&category=' + category.documentId : ''}`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M4.286 12c0-0.533 0.432-0.964 0.964-0.964v0h11.172l-4.14-4.138c-0.175-0.175-0.283-0.416-0.283-0.683 0-0.533 0.432-0.965 0.965-0.965 0.267 0 0.508 0.108 0.683 0.283v0l5.785 5.785c0.175 0.175 0.283 0.416 0.283 0.683s-0.108 0.508-0.283 0.683l-5.785 5.785c-0.175 0.175-0.416 0.283-0.683 0.283-0.533 0-0.965-0.432-0.965-0.965 0-0.267 0.108-0.508 0.283-0.683v0l4.14-4.138h-11.172c-0.533 0-0.964-0.432-0.964-0.964v0z"></path>{' '}
                            </svg>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Article;
