import { Suspense } from "react";
import { LoadingSpinner } from "@/components";
import ProductDetails from "./ProductDetails";
  
  async function getProductData(id) {
    const res = await fetch(`http://localhost:5000/api/products/with-categories/${id}`, { cache: 'no-store' });
    return res.json();
  }

  export async function generateMetadata({ params }) {
    const data = await getProductData(params.id);
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
        url: `https://test/${product.slug}`,
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
  
export default async function ProductEdit({ params: { id } }) {
    const productData = getProductData(id);
  
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