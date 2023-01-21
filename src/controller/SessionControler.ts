import express, { Router } from 'express';
import {HttpStatus} from "../lib/HttpStatus";
import {SessionService} from "../Service/SessionService";
import {ExceptionHandling} from "../lib/Exeption";

const SessionRoute = Router();

SessionRoute.route('/')
    .post(express.json(),async (req,res) => {
        const body = req.body;
        try {
            const session = await SessionService.getInstance().logIn({...body});
            return res.status(HttpStatus.Created).send(session);
        } catch(err) {
            ExceptionHandling(err,res);
        }
    });

SessionRoute.route('/:authId')
    .get(async (req,res) => {
        try{
            const session = await SessionService.getInstance().getTokenInfo(req.params.authId);
            return res.status(HttpStatus.Ok).send(session);
        } catch(err) {
            ExceptionHandling(err,res);
        }
    });

export default SessionRoute;