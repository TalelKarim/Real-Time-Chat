import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose, { mongo } from 'mongoose';
import connectDB from './Config/db.js';
import colors from 'colors';
import userRoutes from './routes/user-route.js'
import {notFound, errorHandler} from './middlewares/errorMiddleware.js '
import chatRoutes from './routes/chatRoute.js'
import messageRoutes from './routes/messageRoutes.js'
import path from 'path'
 import { Server } from "socket.io";

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



app.use('/api/user', userRoutes) 
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)


app.use(notFound)
app.use(errorHandler)


// -------------------------Deployment-----------------

const __dirname1 = path.resolve();


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const server = app.listen(port, () => {
    console.log(`app listening on port ${port}`.yellow.bold)
})


const   io = new Server(server, { pingTimeout: 60000,
    cors: {     origin: 'http://localhost:3000'
    }})


io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
      if (!chat.users) return console.log("chat.users not defined");

      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });