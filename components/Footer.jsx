import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-200 py-4 mt-auto">
            <div
                className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
            >
                <div className="mb-4 md:mb-0 flex-col lg:flex-row flex gap-3">
                    <Link href='/' > <p className='font-xl font-extrabold' >RomeRents</p> </Link>
                    <Link href='/' > <p className='text-gray-500' >All Properties</p> </Link>
                </div>
                <div className="mb-4 md:mb-0">
                </div>

                <div>
                    <p className="text-sm text-gray-500 mt-2 md:mt-0">
                        &copy; {currentYear} RomeRents. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
