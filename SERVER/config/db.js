//Connect MongoDB with Mongoose
import mongoose from 'mongoose';
export const connectDB =  async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Connected to Database Successfully");
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);        
    }
}