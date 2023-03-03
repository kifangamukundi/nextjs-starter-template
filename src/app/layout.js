import './globals.css'

export const metadata = {
  title: 'My First App With NextJS',
  description: 'This is my first app with nextjs react framework',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
