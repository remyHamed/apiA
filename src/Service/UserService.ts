
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
            mail: user.mail.toLowerCase(),
            password: user.password
        }).save();
    }

    public async getUsers(): Promise<UserDocument[]> {
        return UserModel.find();
    }

    async getById(userId: string): Promise<UserDocument> {

        const ObjectId = require('mongoose').Types.ObjectId;
        const id = new ObjectId(userId);
        const document = await UserModel.findById(id);

        if (!document) {
            throw new NotFoundException("User not found");
        }
        return document;
    }

    public async delete(userId: string): Promise<void> {
        const document = await UserModel.findOneAndRemove({_id: userId});
        if (!document) {
            throw new NotFoundException("User not found");
        }
    }

}