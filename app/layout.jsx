import { ToastContainer } from 'react-toastify';
import '@/assets/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';


export const metadata = {
    title: 'Rome Rents | Find Book Enjoy ',
    description: 'Rome Rents , Buy or Rent You Dream Porperty Today'
}

const MainLayout = ({ children }) => {
    return (
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
    )
}

export default MainLayout
