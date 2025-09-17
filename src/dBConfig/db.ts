import mongoose from "mongoose";

export async function connect() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected succesfully!");
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error.' + err);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }    
}