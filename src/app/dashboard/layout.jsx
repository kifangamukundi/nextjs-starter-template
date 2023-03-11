export const metadata = {
    title: {
        default: "Dashboard",
        template: '%s | KifangaMukundi Dashboard',
      },
    description: "This is the dashboard description",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
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