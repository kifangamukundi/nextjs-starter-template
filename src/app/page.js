import Image from 'next/image'
import { Inter } from 'next/font/google'

export default function Home() {
  return (
    <>
    {/* <div className="bg-green-100 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
            <p className="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget sem sit amet magna vestibulum auctor. Sed euismod, metus non mattis sollicitudin, ante sapien suscipit arcu, in fringilla nisi libero eget felis.</p>
            <button className="bg-white text-gray-800 font-bold py-2 px-4 rounded shadow hover:bg-gray-200">Learn More</button>
          </div>
          <div className="md:w-1/2">
            <img src="https://picsum.photos/800/600" alt="Hero" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </div>

    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Discover New Worlds</h1>
        <p className="text-white text-lg md:text-xl mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget sem sit amet magna vestibulum auctor.</p>
        <button className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-600 hover:text-white">Explore Now</button>
      </div>
      <div className="md:w-1/2">
        <img src="https://picsum.photos/800/600" alt="Hero" className="rounded-lg shadow-xl" />
      </div>
    </div>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    </div> */}
    <header>
      <h2>Page</h2>
      <section>
        <h3>Header</h3>
        <nav><h4>Navigation</h4></nav>
      </section>
    </header>
    <main>
      <article>
        <h1>Main</h1>
        <section>
          <h2>Section I</h2>
        </section>
        <section>
          <h2>Section II</h2>
          <section>
            <h3>Subsection a</h3>
          </section>
          <section>
            <h3>Subsection b</h3>
          </section>
        </section>
        <section>
          <h2>Section III</h2>
          <section>
            <h3>Subsection a</h3>
          </section>
        </section>
      </article>
    </main>
    <aside><h3>Aside</h3></aside>
    <footer>
      <section>
        <h3>Footer</h3>
      </section>
    </footer>
    </>
  )
}
