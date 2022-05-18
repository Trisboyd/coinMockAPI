import { Document, Model, model, Types, Schema, Query } from "mongoose";
import { IUser } from "./user";

export interface IMessage extends Document {
    userId: IUser["_id"],
    userName: IUser["name"],
    comment: string
}

const messageSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true,
        maxlength: 240
    }
});

const Message: Model<IMessage> = model('Message', messageSchema)

export default Message;