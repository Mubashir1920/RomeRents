import mongoose from "mongoose";

let connected = false;

const connectMongoDb =async ()=>{

    mongoose.set('strictQuery', true);

    if(connected) {
        console.log("MongoDB Already Connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.log('MongoDB Connected')
    } catch (error) {
        console.log(error)
    }

}

export default connectMongoDb;