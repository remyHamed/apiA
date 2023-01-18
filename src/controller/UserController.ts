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
    })
    .get(async (req,res) => {
        try {
            return res.status(HttpStatus.Ok).send(await UserService.getInstance().getUsers());
        } catch(err) {
            ExceptionHandling(err,res);
        }
    });

userRoute.route('/:userId')
    .get(async (req,res) => {
        try{
            const user = await UserService.getInstance().getById(req.params.userId);
            return res.status(HttpStatus.Ok).send(user);
        } catch(err) {
            ExceptionHandling(err,res);
        }
    })
    .delete(async(req,res) => {
        try{
            await UserService.getInstance().delete(req.params.userId);
            return res.status(HttpStatus.NoContent).end();
        } catch(err) {
            ExceptionHandling(err,res);
        }
    })


export default userRoute;