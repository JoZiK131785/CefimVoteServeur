//const dbConnect = require("./db/dbConnect");
//const userRouter = require("./router/userRouter");
const express = require("express");
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(userRouter);

//dbConnect();

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

require('./Socket/Socket.js')(socketIO);

http.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}`);
});