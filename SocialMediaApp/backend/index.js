const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer =require("multer");
const path = require("path");
const router = express.Router();
dotenv.config();


const dbURL = 'mongodb+srv://sinan:bXF51W8Noo78LbZN@addressbookv1.iezicwe.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(dbURL) //connect to MongoDB server
    .then((result) => {console.log('MongoDB Connection is Established')}) //after connection, write to console
    .catch((err) => {console.log(err)}) //if there is an error, write to console error message


    app.use("/images", express.static(path.join(__dirname, "public/images")));


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "public/images");
    },
    filename: (req, file, cb) => {
    cb(null, req.body.name);
    },
});

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req,res) => {
    try {
        return res.status(200).json("File uploaded successfully.")
    }catch(error){
        console.error(error);
    }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.listen(8800, () => {
    console.log("Backend server is running!!")
});