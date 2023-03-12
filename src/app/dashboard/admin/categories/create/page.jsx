'use client'
import React, { useReducer, useState } from 'react'
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useKeyPress } from '@/components';

import { getError, BASE_URL, LoadingSpinner, MessageInformation } from '@/components';
import { useAuth } from '@/components';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false, structure: action.payload.structure };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false, error: action.payload };
    default:
      return state;
  }
};
export default function CreateCategory() {
  const router = useRouter();

  const { axiosInstance, accessToken } = useAuth();

  const [{ error, loadingCreate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');


  const createHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const {data} = await axiosInstance.post(
        `${BASE_URL}/categories`,
        {
          title,
          slug,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS', payload: data });
      toast.success(data.message);
      router.push(`/dashboard/admin/products`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL', payload: getError(err), });
    }
  };

  // Generate slug
  function generateSlug(title) {
    const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setSlug(generatedSlug);
    return generatedSlug;
  }

  // Keyboard mappings
  const keyMap = {
    'ctrl+shift+b' : 'back',
  };
  const callbackMap = {
    'back': () => router.push(`/dashboard/admin/categories`),
  };
  useKeyPress(keyMap, callbackMap);
  
  

  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-20">
      
      {loadingCreate ? (
        <LoadingSpinner/>
      ) : error ? (
        <MessageInformation>{error}</MessageInformation>
      ) : (
        <div className="flex flex-wrap">
          
          <div className="w-full md:w-1/2 mb-4 md:pr-2">
            <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Create Category
            </h1>
          </div>

          <div className="w-full md:w-1/2 mb-4 md:pr-2">
              <div className="flex flex-wrap">

                  <div className="w-full md:w-1/2 mb-4 md:pr-2">
                      <Link href={`dashboard/admin/categories`}>
                          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                              Categories
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => generateSlug(e.target.value)}
          />
        </div>

      </form>

      <div className="mb-4">
          <button onClick={createHandler} disabled={loadingCreate} className={`bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ${loadingCreate ? 'opacity-50 cursor-not-allowed' : ''}`} type="button" >
              Create
          </button>
      </div>
      
    </div>
  )
}

