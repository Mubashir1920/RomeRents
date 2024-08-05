import Link from 'next/link'


const HomePage = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-10 ' >Home Page</h1>
      <Link href='/properties' className='border border-gray-900 p-5 m-10' >Got to Properties </Link>
    </div>
  )
}

export default HomePage
