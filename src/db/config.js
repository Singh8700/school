import mongoose from "mongoose";

const connectDB = async () => {
    // await console.log("Mongo Url is :",process.env.MONGOURL)
    try {
        await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout set karo
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default connectDB;
