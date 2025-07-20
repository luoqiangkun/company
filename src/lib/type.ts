export interface IImage {
    url: string;
    alternativeText: string;
}

export interface ILink {
    id: number;
    URL: string;
    target?: string;
    text: string;
}

export interface ILinkImage {
    id: number;
    URL?: string;
    target?: string;
    description?: string;
    image: IImage
}

export interface IFaq {
    id: number;
    question: string;
    answer: string;
}

export interface IText {
    id: number;
    text: string;
}


export interface IArticle {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: IImage;
    content: string;
    category?: IText;
    publishedAt: string;
}