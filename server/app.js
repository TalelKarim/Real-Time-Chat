import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose, { mongo } from 'mongoose';
import connectDB from './Config/db.js';
import colors from 'colors';
import userRoutes from './routes/user-route.js'
import {notFound, errorHandler} from './middlewares/errorMiddleware.js '
const app = express();
dotenv.config();

connectDB()

app.use(cors());
app.use(express.json());  //to accept json DATA
const port = process.env.PORT || 8800

app.get('/',(req,res) => {
    res.send('hello world ')
}
 )

app.listen(port, () => {
    console.log(`app listening on port ${port}`.yellow.bold)
})

app.use('/api/user', userRoutes) 

app.use(notFound)
app.use(errorHandler)