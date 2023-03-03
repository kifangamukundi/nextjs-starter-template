import Image from 'next/image'
import { Inter } from 'next/font/google'

export default function Home() {
  console.log("This is a test")
  return (
    <div>
      <h1 className='text-blue-400'>This is the home page</h1>
    </div>
  )
}
