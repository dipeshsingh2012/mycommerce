import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProducts, fetchProductByIdOrSlug } from '@/lib/catalogApi';
import { ProductDetailView } from './ProductDetailView';

interface PageProps {
  params: { id: string };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await fetchProducts({ limit: 100 });
    return products.map((p) => ({
      id: p.id,
    }));
  } catch (err) {
    console.error('generateStaticParams error:', err);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProductByIdOrSlug(params.id);
  if (!product) {
    return {
      title: 'Product Not Found | Hiljhil Cafe',
      description: 'The requested specialty coffee lot or equipment could not be found.',
    };
  }

  const title = `${product.name} | Hiljhil Cafe`;
  const description = product.description;
  const canonicalUrl = `https://hiljhil.com/product/${product.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Hiljhil Cafe',
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await fetchProductByIdOrSlug(params.id);
  if (!product) {
    notFound();
  }

  // Schema.org Product Structured Data (Google Rich Snippets)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Hiljhil Roasters',
    },
    offers: {
      '@type': 'Offer',
      url: `https://hiljhil.com/product/${product.id}`,
      priceCurrency: 'INR',
      price: (product.priceCents / 100).toFixed(2),
      availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
  };

  // Schema.org BreadcrumbList Structured Data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hiljhil.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.category === 'coffee' ? 'Specialty Coffees' : 'Barista Equipment',
        item: `https://hiljhil.com/${product.category === 'coffee' ? 'coffees' : 'equipment'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://hiljhil.com/product/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailView product={product} />
    </>
  );
}
