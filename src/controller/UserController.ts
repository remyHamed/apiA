import express, {Router} from 'express';
import {UserService} from "../Service/UserService";
import {HttpStatus} from "../lib/HttpStatus";
import {ExceptionHandling} from "../lib/Exeption";

const userRoute = Router();

userRoute.route('/')
    .post(express.json(),async (req,res) => {
        const body = req.body;
        try {
            const user = await UserService.getInstance().createUser({...body});
            return res.status(HttpStatus.Created).send(user);
        } catch(err) {
            ExceptionHandling(err,res);
        }
    });
export default userRoute;