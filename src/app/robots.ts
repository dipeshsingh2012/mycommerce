import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/checkout', '/api/'],
    },
    sitemap: 'https://hiljhil.com/sitemap.xml',
  };
}
