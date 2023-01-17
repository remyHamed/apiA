import {HttpStatus} from "./HttpStatus";
import {Response} from "express";

class Exception {
    message;
    type;
    status;
    constructor(message: string) {
        this.message = message;
        this.type = "Error";
        this.status = HttpStatus.InternalServerError;
    }

    toString() {
        return `${this.type}: ${this.message}`;
    }
}

export class NotFoundException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Not Found";
        this.status = HttpStatus.NotFound;
    }
}

export class IncorrectArgumentException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Incorrect Argument";
        this.status = HttpStatus.BadRequest;
    }
}

export class ConflictException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Conflict";
        this.status = HttpStatus.Conflict;
    }
}

export class ExpiredException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Expired";
        this.status = HttpStatus.InvalidToken;
    }
}

export class UnauthorizedException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Not Authorized";
        this.status = HttpStatus.Unauthorized;
    }
}

export const ExceptionHandling = (error:any, res:Response) => {
    switch (error.constructor) {
        case Exception:
            return res.status(error.status).send({error: error.toString()});
        default:
            return res.status(HttpStatus.InternalServerError).send(error);
    }
}