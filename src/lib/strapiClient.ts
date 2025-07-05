import { strapi } from '@strapi/client';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL not set');
}

export const strapiClient = strapi({
    baseURL: baseURL + '/api',
    auth: process.env.API_TOKEN,
});



