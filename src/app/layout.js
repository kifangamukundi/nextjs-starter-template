import { Footer, Navbar } from '@/components'
import styles from './style';
import './globals.css'
import ThemeProvider from './theme-provider';


export const metadata = {
  title: 'Welcome to Kifanga Mukundi | Your Destination for Software Development',
  description: 'Kifanga Mukundi is your go-to destination for Software Development. Our platform offers a wide range of features and resources to help you write better software. Whether youa re looking for programming guides, or simply want to connect with other like-minded individuals, you will find it all here. Explore our site to discover the many ways we can help you achieve your goals. Thank you for choosing Kifanga Mukundi!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <ThemeProvider>
            <div className="bg-white w-full overflow-hidden">
              {/* Header section */}
              <header>
                <div className={`${styles.paddingX} ${styles.flexCenter} bg-blue-800`}>
                  <div className={`${styles.boxWidth}`}>
                    <h2 className="hidden">Kifanga Mukundi</h2>
                    <Navbar />
                  </div>
                </div>
              </header>
              
              {/* Main section or content section */}
              <main>
                <div className={`bg-white ${styles.paddingX} ${styles.flexCenter}`}>
                  <div className={`${styles.boxWidth}`}>
                    <h2 className="hidden">Main Content</h2>
                      {children}
                  </div>
                </div>
              </main>

              {/* footer section */}
              <footer>
              <h2 className="hidden">Footer Links</h2>
                <Footer/>
              </footer>

            </div>
          </ThemeProvider>
        
      </body>
    </html>
  )
}
