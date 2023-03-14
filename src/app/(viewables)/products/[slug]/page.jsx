import { Suspense } from "react";
import { LoadingSpinner } from "@/components";
import ProductDetails from "./ProductDetails";
  
  async function getProductData(slug) {
    const res = await fetch(`http://localhost:5000/api/products/slug/${slug}`, { cache: 'no-store' });
    return res.json();
  }

  export async function generateMetadata({ params }) {
    const data = await getProductData(params.slug);
    const { data: { product } } = data;
    // Convert the string to a Date object
    const createdAt = new Date(product.createdAt);
    const formattedDate = createdAt.toISOString();
    return {
      title: product.title,
      description: product.summary,
      openGraph: {
        title: product.title,
        description: product.summary,
        type: 'article',
        publishedTime: formattedDate,
        url: `https://kifangamukundi/products/${product.slug}`,
        images: [
          {
            url: product.defaultImage,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.summary,
        images: product.otherImages,
      },
    };
  }
export default async function PageView({ params: { slug } }) {
    const productData = getProductData(slug);
  
    return (
      <>
        <Suspense fallback={<LoadingSpinner/>}>
          <Details promise={productData} />
        </Suspense>
      </>
    );
  }
  
  async function Details({ promise }) {
    const { data} = await promise;
    
  
    return (
      <>
        <ProductDetails data={data}/>
      </>
    );
  }