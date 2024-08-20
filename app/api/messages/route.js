import connectMongoDb from "@/config/database";
import { getUserSession } from "@/utils/getUserSession";
import Message from "@/models/Message";

//POST /api/messages

export const POST = async(request)=>{

    try {
        await connectMongoDb()

        const sessionUser = await getUserSession()
        if(!sessionUser || !sessionUser.user){
            return new Response(JSON.stringify({message:'You Must Log In'}) , {status:401})
        }
        const {user} = sessionUser
        const {name ,email,phone ,message , recepient , property} =await request.json()

        //Cant Send Message to themselve
        if(user.id === recepient){
            return new Response(JSON.stringify({message:'Bad Request Cant Send Message to Yourself'}), {status:400})
        }

        const newMessage = new Message({
            sender : user.id,
            recipient:recepient ,
            property,
            name,
            email,
            phone,
            body:message
        })

        await  newMessage.save()
        return new Response('Successlly Sent Message',{status:200})
        
    } catch (error) {
        console.log(error);
        return new Response('Server Went Wrong ',{status:500})
    }


}