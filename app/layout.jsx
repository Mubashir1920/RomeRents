import '@/assets/styles/global.css'
import React from 'react';

export const metadata = {
    title : 'Rome Rents | Find Book Enjoy ',
    description : 'Rome Rents , Buy or Rent You Dream Porperty Today'
}

const MainLayout = ({ children }) => {
    return (
        <html>
            <body>
                <div>
                    {children}
                </div>
            </body>
        </html>

    )
}

export default MainLayout
