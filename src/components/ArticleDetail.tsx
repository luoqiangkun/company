
import { IArticle } from "@/lib/type";
import Image from "next/image";
import parse from 'html-react-parser';
import { strapiImage } from "@/lib/strapiImage";
type Props = {
    data: IArticle
}

export const ArticleDetail = ({ data }: Props) => {
    return (
        <div className="lg:mt-14">
            <div className="text-center py-10 px-2 m-auto md:px-4 lg:max-w-3xl">
                <h1 className="text-4xl pb-6">{ data.title }</h1>
                <div className="flex items-center justify-center gap-x-5">
                    <a className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                    Company News
                    </a>
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">January 18, 2023</p>
                </div>

            </div>

            <div className="relative w-full">
                <Image
                    src={strapiImage(data.image.url)}
                    alt={data.image.alternativeText}
                    width={1600} // 原始宽度（任意值，仅用于比例计算）
                    height={900} // 原始高度（与宽度保持原始比例）
                    layout="responsive"
                />
            </div>

            <article className="text-4xl mx-auto md:px-4 lg:max-w-3xl">
                {parse(data.content)}
            </article>

        </div>
    );
};

export default ArticleDetail;