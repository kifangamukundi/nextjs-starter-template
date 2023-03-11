'use client'

export const getError = (error) => {
    return error.response && error.response.data.error
      ? error.response.data.error
      : error.message;
  };
    
  export const BASE_URL = "http://localhost:5000/api";
    