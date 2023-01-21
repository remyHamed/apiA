import mongoose, {Model, Schema} from "mongoose";
import {UserProps} from "./User";


const SessionSchema = new Schema({
    user: {
        type: Schema.Types.String,
        required: true,
        ref: "User"
    },
    expiration: {
        type: Schema.Types.Date
    }
}, {
    collection: "sessions",
    timestamps: true,
    versionKey: false
});

export interface SessionProps {
    _id: string,
    user: string | UserProps,
    expiration?: Date,
}

export type SessionDocument = SessionProps & Document;
export const AuthModel: Model<SessionDocument> = mongoose.model<SessionDocument>("Auth", SessionSchema);