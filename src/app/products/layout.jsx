
export const metadata = {
  title: 'All Products',
  description: 'All Products description',
}

export default function Layout({ children }) {
    return (
      <div className='border border-green-400'>
        Products layout
        {children}
      </div>
    )
  }