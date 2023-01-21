import express from "express";
import userRoute from "./controller/UserController";
import mongoose from "mongoose";
import {config} from "dotenv";
import SessionRoute from "./controller/SessionControler";
config();


async function bootstrap(): Promise<void> {
    const app = express();

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "PATCH, POST, DELETE, GET")
        next();
    });

    await mongoose.connect(process.env.MONGO_URI as string, {
        auth: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD
        }
    });

    app.use('/login', SessionRoute);
    app.use('/user', userRoute)
    app.get('/', (req, res) => {
        res.send('Hello wolrd!')
    })
    app.listen(process.env.PORT, function() {
        console.log("Server listening on port " + process.env.PORT);
    });
}

bootstrap().catch(console.error);
