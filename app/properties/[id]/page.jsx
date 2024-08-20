'use client'
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { fetchProperty } from "@/utils/request";
import PropertyHeaderImg from "@/components/PropertyHeaderImg";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyContactForm from "@/components/PropertyContactForm";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";


const PropertySingle = () => {
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPropertiesData = async () => {
      try {
        const data = await fetchProperty(id)
        setProperty(data)

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      if (!property && !loading) {
        return (<p classNameName="text-2xl font-bold text-center" >No Property Found</p>)
      }
    }

    if (property === null) {
      fetchPropertiesData();
    }


  }, [id, property])

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImg image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href='/properties'
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />

        </>

      )}

    </>
  )
}

export default PropertySingle
