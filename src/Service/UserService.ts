
import {UserDocument, UserModel, UserProps} from "../model/User";
import {NotFoundException} from "../lib/Exeption";


export class UserService {
    private static instance?: UserService;

    public static getInstance(): UserService {
        if (UserService.instance === undefined) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async createUser(user: UserProps): Promise<UserDocument> {

        return await new UserModel({
            ...user,
            userName: user.userName,
            mail: user.mail.toLowerCase(),
            password: user.password
        }).save();
    }

    public async getUsers(): Promise<UserDocument[]> {
        return UserModel.find();
    }

    async getById(userId: string): Promise<UserDocument> {
        console.log('poulet');
        const ObjectId = require('mongoose').Types.ObjectId;
        const id = new ObjectId(userId);
        const userDocument = await UserModel.findById(id);

        if (!userDocument) {
            throw new NotFoundException("User not found");
        }
        return userDocument;
    }

    public async delete(userId: string): Promise<void> {
        const document = await UserModel.findOneAndRemove({_id: userId});
        if (!document) {
            throw new NotFoundException("User not found");
        }
    }

    public async logIn(info: { mail: string, password: string }): Promise<UserDocument> {

        console.log(info.mail, info.password);
        const user = await UserModel.findOne({mail:info.mail, password:info.password});

        if (!user) {
            throw new NotFoundException("No user with this email or password has been found");
        }

        return user;
    }

    async updateUserPassword(uid:string,password : string) {
        const User = await this.getById(uid);
        if (!User) {
            throw new NotFoundException("user not found");
        }
        User.password = password;
        return await User.save();
    }

}