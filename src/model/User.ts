import mongoose, {Schema, Document, Model} from "mongoose";

const userSchema = new Schema({
    mail: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    }
}, {
    collection: "users",
    timestamps: true,
    versionKey: false
});

export interface UserProps {
    mail: string,
    password: string
}

export type UserDocument = UserProps & Document;
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);