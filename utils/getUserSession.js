import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";


export const getUserSession = async () => {
    try {
        const sessionUser = await getServerSession(authOptions)
        if (!sessionUser || !sessionUser.user) {
            return null
        }

        return {
            user: sessionUser.user,
            userId: sessionUser.user.id
        }
    } catch (error) {
        console.error(error)
        return null
    }
}