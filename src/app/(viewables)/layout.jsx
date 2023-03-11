export const metadata = {
    title: {
        default: "Viewable Item",
        template: '%s | KifangaMukundi',
      },
    description: "Viewable item description",
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
  }
  
  export default function Layout({ children }) {
      return (
        <>
          {children}
        </>
      )
    }