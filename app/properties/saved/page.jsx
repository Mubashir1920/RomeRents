'use client'
import { useState, useEffect } from "react"
import PropertyCard from "@/components/PropertyCard"
import { toast } from "react-toastify"
import Spinner from "@/components/Spinner"


const SavedProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        const fetchProperties = async () => {
            try {
                const res = await fetch('/api/bookmarks/saved')

                if (res.status === 200) {
                    const data = await res.json()
                    setProperties(data)
                } else {
                    console.log(res.statusText)
                    toast.error('Failed to fetch saved properties')
                }
            } catch (error) {
                toast.error('Failed To Fetch!')
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [])

    return loading ? (<Spinner loading={loading} />) :
        (
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-black mb-6 text-center">
                        Saved Properties
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties == 0 ? <p className='text-center text-3xl font-bold' >No Properties Found</p> :
                            (properties.map(prop => (
                                <PropertyCard key={prop._id} property={prop} />
                            )))}
                    </div>
                </div>
            </section>
        )
}

export default SavedProperties
