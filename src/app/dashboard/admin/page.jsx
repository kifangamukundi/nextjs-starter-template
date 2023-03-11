'use client'
import Link from 'next/link'
import React from 'react'

export default function AdminDashboard() {
  return (
    <>
        {/* Top section */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="py-8">
                <h1 class="text-3xl font-bold text-gray-900">Overview</h1>
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-bold text-gray-900 mb-4">Revenue</h2>
                    <p class="text-3xl font-bold text-green-500">$10,000</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-bold text-gray-900 mb-4">Users</h2>
                    <p class="text-3xl font-bold text-blue-500">1,000</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-bold text-gray-900 mb-4">Conversion Rate</h2>
                    <p class="text-3xl font-bold text-yellow-500">5%</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-lg font-bold text-gray-900 mb-4">Sessions</h2>
                    <p class="text-3xl font-bold text-red-500">10,000</p>
                </div>
                </div>
            </div>
        </div>
        {/* Management section */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="py-8">
                <h1 class="text-3xl font-bold text-gray-900">Management</h1>
                <div class="mt-4">
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-bold text-gray-900 mb-4">Products</h2>
                        <Link href={`/dashboard/admin/products`}>
                            <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                                Manage
                            </button>
                        </Link>
                    </div>
                    </div>
                    <div class="w-full md:w-1/2 px-4">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-bold text-gray-900 mb-4">Categories</h2>
                        <Link href={`/dashboard/admin/categories`}>
                            <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                                Manage
                            </button>
                        </Link>
                    </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-4 mt-4">
                    <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-bold text-gray-900 mb-4">Posts</h2>
                        <Link href={`/dashboard/admin/posts`}>
                            <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                                Manage
                            </button>
                        </Link>
                    </div>
                    </div>
                    <div class="w-full md:w-1/2 px-4">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-bold text-gray-900 mb-4">Users</h2>
                        <Link href={`/dashboard/admin/users`}>
                            <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2">
                                <svg class="w-4 h-4 inline-block mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                                Manage
                            </button>
                        </Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
