'use client'
import React, { useMemo, useReducer, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

import { BASE_URL, LoadingSpinner, MessageInformation, getError } from '@/components';
import useCheckbox from '@/components/useCheckbox';
import { Tiptap } from '@/components';
import { useAuth } from '@/components';
import { ImageGalleryModal } from '@/components';


const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false, product: action.payload.product };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false, error: action.payload };
      case 'UPLOAD_REQUEST':
        return { ...state, loadingUpload: true, errorUpload: '' };
      case 'UPLOAD_SUCCESS':
        return {
          ...state,
          loadingUpload: false,
          errorUpload: '',
        };
      case 'UPLOAD_FAIL':
        return { ...state, loadingUpload: false, errorUpload: action.payload };
  
      default:
        return state;
    }
  };

export default function ProductDetails({data}) {
const { product } = data;

const router = useRouter();

const { axiosInstance, accessToken } = useAuth();

const [{ error, loadingUpdate, loadingUpload }, dispatch] =
useReducer(reducer, {
  error: '',
});

const [image, setImage] = useState(product.defaultImage);
const [images, setImages] = useState(product.otherImages);
const [content, setContent] = useState(product.content);
const [categories, setCategories] = useState([]);
const [newCategories, setNewCategories] = useState([]);

const [showModal, setShowModal] = useState(false);
const handleModalOpen = () => {
  setShowModal(true);
};

const preSelectedIds =product.categories.map(item => item._id);
const [checkedItems, checkboxes] = useCheckbox(newCategories, preSelectedIds);

const addCheckedProperty = (options, selectedIds) => {
  return options.map((option) => {
    if (selectedIds.includes(option._id)) {
      return { ...option, checked: true };
    } else {
      return { ...option, checked: false };
    }
  });
};

  
// Fetch categories
useEffect(() => {
  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`${BASE_URL}/categories`);

      dispatch({ type: 'FETCH_SUCCESS' });

      setCategories(data.data.categories);
      const newcollection = addCheckedProperty(data.data.categories, preSelectedIds)
      setNewCategories(newcollection)
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
        payload: getError(err),
      });
    }
  };
  fetchData();
}, []);

// Testing
const initialState = product;

const [item, setItem] = useState(initialState);

const handleChange = (e) => {
  const { name, value } = e.target;
  setItem(prevItem => ({
    ...prevItem,
    [name]: name === 'otherImages' ? value.split(',') : value
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Only include fields that have been changed
  const updatedFields = {};
  for (const key in item) {
    if (item[key] !== initialState[key]) {
      updatedFields[key] = item[key];
    }
  }

  const updates = {
    ...updatedFields,
    content,
    categories: checkedItems,
  }

  try {
    dispatch({ type: 'UPDATE_REQUEST' });
    const { data } = await axiosInstance.patch(`${BASE_URL}/products/${product._id}`, updates, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch({ type: 'UPDATE_SUCCESS', payload: data });
    toast.success(data.message);
    router.push(`/dashboard/admin/products`);
  } catch (err) {
    dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
  }
};

const output = useMemo(() => {
    return generateHTML(content, [
        StarterKit,
        Underline,
        Highlight.configure({multicolor: true}),
    ])
    }, []);

    
  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-20">
      
      {loadingUpdate ? (
        <LoadingSpinner/>
      ) : error ? (
        <MessageInformation>{error}</MessageInformation>
      ) : (
        <div className="flex flex-wrap">
          
          <div className="w-full md:w-1/2 mb-4 md:pr-2">
            <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Create New Structure
            </h1>
          </div>

          <div className="w-full md:w-1/2 mb-4 md:pr-2">
              <div className="flex flex-wrap">

                  <div className="w-full md:w-1/2 mb-4 md:pr-2">
                      <Link href={`dashboard/admin/products`}>
                          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                              Structures
                          </button>
                      </Link>
                  </div>

                  <div className="w-full md:w-1/2 mb-4 md:pr-2">
                      <Link href={`dashboard/admin/products`}>
                          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                              Preview
                          </button>
                      </Link>
                  </div>

              </div>
          </div>

        </div>
      )}

      <form className="flex flex-wrap">

        <div className="w-full md:w-1/2 mb-4 md:pr-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input 
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="title" 
            type="text" 
            placeholder="Title"
            value={item.title}
            name='title'
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="slug">
            Slug
          </label>
          <input 
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="slug" 
            type="text" 
            placeholder="Example... structure-name"
            value={item.slug}
            name='slug'
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-1/2 mb-4 md:pl-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
            Category
          </label>
          {/* testing */}
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">Checkbox List</h1>
              {checkboxes}
              <div>
                <strong>Selected items:</strong>
                <ul>
                  {checkedItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
        </div>

        <div className="w-full mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="summary">
            Short Summary
          </label>
          <textarea 
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="summary" 
            placeholder="Enter your summary here"
            value={item.summary}
            name='summary'
            onChange={handleChange}
          >
          </textarea>
        </div>

        <div className="w-full mb-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input type="file" id="image" className="hidden" />
          <label htmlFor="image" className="block w-full md:w-1/2 mb-4 md:pr-2 md:float-left cursor-pointer bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Upload Image
          </label>
          <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:pl-2">
            <div id="image-preview" className="w-full p-2 rounded-lg border border-gray-300">
              <img id="preview" className="w-full h-auto" src="" alt="Image Preview" />
              <div id="no-preview" className="hidden">
                No image selected.
              </div>
            </div>
          </div>
        </div>

      </form>

      <div className="w-full mb-4">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="content">
          Structure Content
        </label>
        <Tiptap setContent={setContent} content={output} />
      </div>

      <div className="mb-4">
          <button onClick={handleSubmit} disabled={loadingUpdate} className={`bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ${loadingUpdate ? 'opacity-50 cursor-not-allowed' : ''}`} type="button" >
              Update
          </button>
      </div>

      {/* Am testing the gallery */}

      <button onClick={handleModalOpen}>Open Gallery Modal</button>
      <ImageGalleryModal showModal={showModal} setShowModal={setShowModal} images={images} />
      
    </div>
  )
}