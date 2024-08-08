import connectMongoDb from "@/config/database"

export const GET = async ()=>{
    try {
        await connectMongoDb();
        return new Response('hello world', {status:200})
        
    } catch (error) {
        console.log(error)
        return new Response('Something Went Wrong', {status:500})

    }
}