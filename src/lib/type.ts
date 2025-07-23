import { API } from '@strapi/client';
export interface IImage extends API.Document {
    url: string;
    alternativeText: string;
}

export interface ILink extends API.Document {
    id: number;
    URL: string;
    target?: string;
    text: string;
}

export interface ILinkImage extends API.Document {
    id: number;
    URL?: string;
    target?: string;
    description?: string;
    image: IImage;
}

export interface IFaq extends API.Document {
    id: number;
    question: string;
    answer: string;
}

export interface IText extends API.Document {
    id: number;
    text: string;
}

export interface IArticle extends API.Document {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: IImage;
    content: string;
    category?: IText;
    publishedAt: string;
}

export interface ICategory extends API.Document {
    id: number;
    text: string;
}

