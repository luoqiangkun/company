import { IArticle } from '@/lib/type';
import Image from 'next/image';
import parse from 'html-react-parser';
import { strapiImage } from '@/lib/strapiImage';
type Props = {
    data: IArticle;
};

export const ArticleDetail = ({ data }: Props) => {
    const formatDate = (isoString: string): string => {
        const date = new Date(isoString)
        const month = date.getMonth() + 1 // 月份是从 0 开始的
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}月${day}，${year}`
    }
    
    return (
       <div className="mt-24 px-4">
                <article className="max-w-7xl mx-auto sm:mb-16">
                    <header className="max-w-3xl mx-auto mb-6 sm:mb-8">
                        <div className="mb-3 text-sm uppercase tracking-wider text-slate-500">
                            <span className="text-primary">{data.category?.text}</span> /
                            <time>{formatDate(data.publishedAt)}</time>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
                            {data.title}
                        </h1>
                    </header>
                    <figure className="w-full aspect-video relative my-6 lg:py-10 ">
                        <Image
                            className="object-cover"
                            src={strapiImage(data.image.url)}
                            alt={data.image.alternativeText}
                            fill
                            sizes="100vw"
                        />
                    </figure>
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-slate sm:prose-lg max-w-none">
                            {parse(data.content)}
                        </div>
                    </div>
                </article>
            </div>
    );
};

export default ArticleDetail;
