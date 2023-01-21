
import dayjs from "dayjs";
import {SessionDocument, SessionModel} from "../model/Session";
import {NotFoundException} from "../lib/Exeption";
import {UserModel} from "../model/User";

export class SessionService {
    private static instance?: SessionService;

    public static getInstance(): SessionService {
        if (SessionService.instance === undefined) {
            SessionService.instance = new SessionService();
        }
        return SessionService.instance;
    }

    public async logIn(info: { mail: string, password: string }): Promise<SessionDocument> {
        console.log(info);
        console.log("info.mail",info.mail);
        console.log("info.password",info.password)
        const user = await UserModel.findOne({mail:info.mail, password:info.password});
        console.log("user:",user);
        if (!user) {
            throw new NotFoundException("No user with this email or password has been found");
        }

        const session = new SessionModel({
            user: user._id,
            expiration: dayjs().add(1, "day").toDate()
        });
        return await session.save();
    }

    public async getTokenInfo(token: string): Promise<SessionDocument> {
        const Session = await SessionModel.findById(token);

        if (!Session) {
            throw new NotFoundException("No session with this token found");
        }

        return Session;
    }
}