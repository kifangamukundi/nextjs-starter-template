'use client'

export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center">
        <div className="w-5 h-5 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    )
  }