'use client'
import React from "react";
import axios from 'axios';
import { getError, BASE_URL } from '@/components';

export default function ImageGalleryModal({ showModal, setShowModal, images }) {
  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = (publicId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      deleteImage(publicId);
    }
  };
  
const deleteImage = async (publicId) => {
    try {
      const response = await axios.post(`${BASE_URL}/uploads/delete-media`, { public_id: publicId });

      if (response.status === 200) {
        console.log(`Image ${publicId} has been deleted successfully.`);
      }

      return response.data;
    } catch (error) {
      console.error(`Error deleting image ${publicId}: ${error}`);
    }
  };

const imageList = (
    <div className="flex flex-wrap">
      {images.map((image, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
          <img src={image.secure_url} alt={`gallery-image-${index}`} className="w-full" />
          <button onClick={() => handleDelete(image.public_id)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-red-600"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            </button>

        </div>
      ))}
    </div>
  );
  

  return (
    <>
      {showModal ? (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            >

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Modal Title
                    </h3>
                    <div className="mt-2">{imageList}</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

