import connectMongoDb from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";


export const dynamic = 'force-dynamic'

export const POST = async (request) => {

    try {
        await connectMongoDb()

        const sessionUser = await getUserSession()

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is Required', { status: 401 })
        }
        const { userId } = sessionUser
        const { propertyId } = await request.json()

        const user = await User.findById(userId);
        if (!user) {
            return new Response('User Not Found', { status: 404 })
        }

        let isBookmarked = user.bookmarks.includes(propertyId)
        let message;
        if (isBookmarked) {
            user.bookmarks.pull(propertyId);
            message = "Property removed from bookmarks";
            isBookmarked = false
        } else {
            user.bookmarks.push(propertyId);
            message = "Property added to bookmarks";
            isBookmarked = true
        }
        user.save();
        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Something Went Wrong!')
    }


}