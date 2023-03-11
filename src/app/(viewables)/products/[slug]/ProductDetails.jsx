'use client'
import React, { useMemo } from 'react';

import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { ImageCarousel } from '@/components';


export default function ProductDetails({data}) {
const { product } = data;

const output = useMemo(() => {
    return generateHTML(product.content, [
        StarterKit,
        Underline,
        Highlight.configure({multicolor: true}),
    ])
    }, [product.content])
  return (
    <section class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">{product.title}</h1>
      <ImageCarousel images={product.otherImages} description ={product.title} />
      <div class="prose prose-lg text-gray-700">
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </section>

  )
}
