import mongoose, {Schema, Document, Model} from "mongoose";

const userSchema = new Schema({
    userName: {
        type: Schema.Types.String,
        required: true
    },
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
    timestamps: false,
    versionKey: false
});

export interface UserProps {
    userName :string,
    mail: string,
    password: string
}

export type UserDocument = UserProps & Document;
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);