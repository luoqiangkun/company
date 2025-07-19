import { IArticle } from '@/lib/type';
import Image from 'next/image';
import parse from 'html-react-parser';
import { strapiImage } from '@/lib/strapiImage';
type Props = {
    data: IArticle;
};

export const ArticleDetail = ({ data }: Props) => {
    return (
       <div className="mt-24">
                <article className="max-w-7xl mx-auto sm:mb-16">
                    <header className="max-w-3xl mx-auto mb-6 sm:mb-8">
                        <div className="mb-3 text-sm uppercase tracking-wider text-slate-500">
                            <span className="text-primary">Featured</span> /
                            <time>January 15, 2024</time>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
                            Your Roadmap to Framework Selection Success
                        </h1>
                    </header>
                    <figure className="w-full aspect-video relative my-10 ">
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
