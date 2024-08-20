import connectMongoDb from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/search

export const GET = async (request) => {
    try {
        await connectMongoDb()
        const { searchParams } = new URL(request.url)
        const location = searchParams.get('location')
        const proptype = searchParams.get('propertytype')
        console.log(location, proptype)

        const locationPattern = new RegExp(location, 'i')
        const query = {
            $or: [
                { name: locationPattern },
                { description: locationPattern },
                { 'location.street': locationPattern },
                { 'location.city': locationPattern },
                { 'location.state': locationPattern },
                { 'location.zipcode': locationPattern },
            ]
        }


        if (proptype && proptype !== 'All') {
            const typePattern = new RegExp(proptype,'i')
            query.type= typePattern
        }

        const properties = await Property.find(query)



        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Something Went Wrong On the Server', { status: 500 })
    }
}