'use client'
import { useState, useEffect } from "react"
import { FaBookmark } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"


const BookmarkButton = ({ property }) => {

    const { data: session } = useSession()
    const userId = session?.user?.id
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [loading , setLoading] = useState(true)


    const handleBookmark = async () => {
        if (!userId) {
            toast.error('Login Required')
            return
        }


        try {
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    propertyId: property._id,
                })
            })
            if (res.status === 200) {
                const data = await res.json()
                toast.success(data.message)
                setIsBookmarked(data.isBookmarked)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something\'s Not Right')
        }
    }

    useEffect(() => {

        const checkBookmarked = async () => {
            if(!userId){
                setLoading(false)
                return
            }
            try {
                const res = await fetch('/api/bookmarks/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        propertyId: property._id,
                    })
                })
                if (res.status === 200) {
                    const data = await res.json()
                    setIsBookmarked(data.isBookmarked)
                }
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        checkBookmarked();

    }, [property._id, userId])

    if(loading) return <p className="text-center">Loading...</p>

    return isBookmarked ? (
        <button onClick={handleBookmark}
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className=" mr-2" /> Remove Property
        </button>
    ) : (
        <button onClick={handleBookmark}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className=" mr-2" /> Bookmark Property
        </button>
    )
}

export default BookmarkButton
