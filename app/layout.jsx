import '@/assets/styles/global.css';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';


export const metadata = {
    title : 'Rome Rents | Find Book Enjoy ',
    description : 'Rome Rents , Buy or Rent You Dream Porperty Today'
}

const MainLayout = ({ children }) => {
    return (
        <html>
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer/>
            </body>
        </html>

    )
}

export default MainLayout
