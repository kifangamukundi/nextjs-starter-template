'use client'
import React, {  useReducer, useEffect } from 'react'
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { getError, BASE_URL, LoadingSpinner, MessageInformation } from '@/components';
import { useAuth } from '@/components';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.data.products,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
export default function ProductsDashboard() {
  const router = useRouter();

  const first30 = /^([\w'-]+(?:\s+[\w'-]+){0,29})/;
  const first20 = /^([\w'-]+(?:\s+[\w'-]+){0,19})/;

  const { axiosInstance, accessToken } = useAuth();

  const [{ loading, error, products, loadingDelete, 
    successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  
  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
        try {
        const { data } = await axiosInstance.get(
            `${BASE_URL}/products`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        toast.success(data.message);
        } catch (err) {
          dispatch({
            type: 'FETCH_FAIL',
            payload: getError(err),
          });
        }
    };
    if (successDelete) {
        dispatch({ type: 'DELETE_RESET' });
    } else {
        fetchData();
    }
    }, [successDelete, accessToken]);

  // Delete Handler
  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure you want to delete?')) {
        try {
        dispatch({ type: 'DELETE_REQUEST' });
        const {data} = await axiosInstance.delete(`${BASE_URL}/products/${product._id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch({ type: 'DELETE_SUCCESS', payload: data });
        toast.success(data.message);
        } catch (error) {
          dispatch({
              type: 'DELETE_FAIL',
              payload: getError(error),
          });
        }
    }
    };

  return (
    <>
      {/* Top Section */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="py-8">
                <h1 class="text-3xl font-bold text-gray-900">Manage Products</h1>
                <div class="mt-4">
                <div class="flex flex-wrap -mx-4 mt-4">
                    <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                      <div class="bg-white rounded-lg shadow p-6">
                          <Link href={`/dashboard/admin/products`}>
                              <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                  <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                                  Back
                              </button>
                          </Link>
                      </div>
                    </div>

                    <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                      <div class="bg-white rounded-lg shadow p-6">
                          <Link href={`/dashboard/admin/products/create`}>
                              <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                  <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                                  Create
                              </button>
                          </Link>
                          {/* Temp */}
                          <Link href={`/dashboard/admin/categories/create`}>
                              <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                  <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                                  category
                              </button>
                          </Link>
                      </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
        {/* Listing */}
        {(loading || loadingDelete) ? (
          <LoadingSpinner/>
        ) : error ? (
          <MessageInformation>{error}</MessageInformation>
        ) : (
        <div class="flex flex-wrap">

            {products?.map((product) => (
            <div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                <div class="bg-white shadow-md rounded-md overflow-hidden">
                  <div class="bg-gray-200 px-4 py-2">
                      <h2 class="text-lg font-semibold text-gray-700">{product.title.match(first20)[1]}</h2>
                  </div>
                  <div class="px-4 py-2">
                      <ul class="divide-y divide-gray-300">

                      <li class="py-2 flex">
                          <div class="flex-shrink-0">
                              <img src={product.defaultImage} alt="Product 1" class="w-16 h-16 rounded-md" />
                          </div>
                          <div class="ml-4">
                              <h3 class="text-lg font-semibold text-gray-700 mb-2">Category</h3>
                              <p class="text-gray-500">{product.summary.match(first30)[1]}</p>
                              <div class="flex mt-2">
                              <Link href={`/products/${product.slug}`}>
                                <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                    <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                                    View
                                </button>
                              </Link>
                              <Link href={`dashboard/admin/products/edit/${product._id}`}>
                                <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                    <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    Edit
                                </button>
                              </Link>
                              <button onClick={() => deleteHandler(product)} class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md">
                                  <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h14v14H5z"/><path d="M12 3v18"/></svg>
                                  Delete
                              </button>
                              </div>
                          </div>
                      </li>
                      </ul>
                  </div>
                </div>
            </div>
            ))}
                
        </div>
        )}
    </>
  )
}
