import { Footer, Navbar } from '@/components'
import styles from './style';
import './globals.css'
import ThemeProvider from './theme-provider';


export const metadata = {
  title: 'My First App With NextJS',
  description: 'This is my first app with nextjs react framework',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <ThemeProvider>

            <div className="bg-white w-full overflow-hidden">
              <header>
                <div className={`${styles.paddingX} ${styles.flexCenter} bg-blue-800`}>
                  <div className={`${styles.boxWidth}`}>
                    <Navbar />
                  </div>
                </div>
              </header>
              
              
              <div className={`bg-white ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    {children}
                </div>
              </div>

              <div className="bg-blue-800">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                  <div className={`${styles.boxWidth}`}>
                    
                    <Footer/>

                  </div>
                </div>
              </div>

            </div>
          </ThemeProvider>
        
      </body>
    </html>
  )
}
