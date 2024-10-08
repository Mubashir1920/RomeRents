'use client'
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import ProfileDefault from '@/assets/images/profile.png'
import { useState, useEffect } from "react"
import Spinner from "@/components/Spinner"
import { toast } from "react-toastify"

const page = () => {

    const { data: session } = useSession()
    const ProfileImage = session?.user?.image
    const ProfileEmail = session?.user?.email
    const ProfileName = session?.user?.name
    const userId = session?.user?.id


    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProperties = async (userId) => {
            try {
                const response = await fetch(`/api/properties/user/${userId}`)
                const data = await response.json()
                setProperties(data)
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }

        }

        if (session?.user && session.user.id) {
            fetchProperties(userId)
        }



    }, [session])

    const handleDeleteProperty= async (propertyId)=>{
        const confirmed = window.confirm('Are You Sure You Want to Delete the Property?')

        if(!confirmed) return;
        try {
            const  res =await fetch(`/api/properties/${propertyId}`,{
                method: 'DELETE',
            })
            if(res.status === 200){
                const updatedProp = properties.filter(property => property._id !== propertyId)
                setProperties(updatedProp)
                toast.success('Property Deleted')
            }else{
                toast.error('Failed To Delete Property')
            }
        } catch (error) {
            toast.error('Failed To Delte Property')
            console.log(error)
        }


    }


    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl mx-10 font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-10 mt-10">
                            <div className="shadow-lg rounded-2xl p-10">
                                <div className="mb-4">
                                    <Image
                                        className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                        src={ProfileImage || ProfileDefault}
                                        alt="User"
                                        height={100}
                                        width={100}
                                    />
                                </div>
                                <h2 className="text-xl mb-4"><span className="font-bold block">Name: </span> {ProfileName}</h2>
                                <h2 className="text-xl"><span className="font-bold block">Email: </span> {ProfileEmail} </h2>
                            </div>

                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                            {!loading && properties.length === 0 && (
                                <p className="text-2xl font-semibold" >No listings found.</p>
                            )}
                            {loading ? (<Spinner loading={loading} />) : (
                                properties.map(property => (
                                    <div key={property._id} className="mb-10">
                                        <Link href={`/properties/${property._id}`}>
                                            <Image
                                                className="h-32 w-full rounded-md object-cover"
                                                src={property.images[0]}
                                                alt={property.name}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                priority={true}
                                            />
                                        </Link>
                                        <div className="mt-2">
                                            <p className="text-lg font-semibold"> {property.name} </p>
                                            <p className="text-gray-600">  {property.location.street} {property.location.city} {property.location.state} </p>
                                        </div>
                                        <div className="mt-2">
                                            <Link href={`/properties/${property._id}/edit`}
                                                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                            onClick={()=>handleDeleteProperty(property._id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                type="button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}





                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default page
