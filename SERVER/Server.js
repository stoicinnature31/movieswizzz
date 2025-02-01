import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import UserRouter from './Routes/UserRouter.js'
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



//Connect to DB
connectDB();

// Main Route
app.get('/', (req, res) => {
    res.send('server is running...');
})


// Other Routes
app.use("/api/users", UserRouter)

//Error handling middle ware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
