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

userRoute.route('/login')
    .post(express.json(),async (req,res) => {
        const body = req.body;
        try {
            const user = await UserService.getInstance().logIn({...body});
            return res.status(HttpStatus.Created).send(user);
        } catch(err) {
            ExceptionHandling(err,res);
        }
    })

userRoute.route('/:userId')
    .post(express.json(),async (req,res) => {
        const body = req.body;
        try {
            const user = await UserService.getInstance().logIn({...body});
            return res.status(HttpStatus.Created).send(user);
        } catch(err) {
            ExceptionHandling(err,res);
        }
    })
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
    .patch(express.json(), async (req, res) => {
        try {
            const u = await  UserService.getInstance().updateUserPassword(req.params.userId, req.body.password);
            return res.status(HttpStatus.Ok).send(u);
        } catch (err) {
            ExceptionHandling(err, res);
        }
    });


export default userRoute;