import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads/recordings", express.static("uploads/recordings"));
app.use("/uploads/images/", express.static("uploads/images"));

app.use("/api/auth/", AuthRoutes);
app.use("/api/messages", MessageRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
  });
  

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });



  // creating a global variable onlineUsers to store all online users
  global.onlineUsers = new Map();  

  // socket.io function to create a listner on connection, whenever a new connection is setup
  // this block of code will execute
io.on("connection", (socket) => {

  // creating a global variable chatSocket 
  global.chatSocket = socket;

  // creating a event listner on add-user this event is being called from main and admin and sever/index files
  socket.on("add-user", (userId) => {

    // 
    onlineUsers.set(userId, socket.id);
    socket.broadcast.emit("online-users", {
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  });

  socket.on("signout", (id) => {
    onlineUsers.delete(id);
    socket.broadcast.emit("online-users", {
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket
        .to(sendUserSocket)
        .emit("msg-recieve", { from: data.from, message: data.message });
    }
  });

  socket.on("mark-read", ({ id, recieverId }) => {
    const sendUserSocket = onlineUsers.get(id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("mark-read-recieve", { id, recieverId });
    }
  });
});