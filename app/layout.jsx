import { ToastContainer } from 'react-toastify';
import '@/assets/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GLobalContext';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import 'photoswipe/dist/photoswipe.css'

export const dynamic = "force-dynamic";
export const metadata = {
    title: 'Rome Rents | Find Book Enjoy ',
    description: 'Rome Rents , Buy or Rent You Dream Porperty Today'
}

const MainLayout = ({ children }) => {
    return (
        <GlobalProvider >
            <AuthProvider>
                <html>
                    <body>
                        <Navbar />
                        <main>
                            {children}
                        </main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </AuthProvider>
        </GlobalProvider>
    )
}

export default MainLayout
