import { Document, Model, model, Types, Schema, Query } from "mongoose";
import { IUser } from "./user";

export interface IMessage extends Document {
    owner: IUser["_id"],
    comment: string
}

const messageSchema: Schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true,
        maxlength: 240
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Message: Model<IMessage> = model('Message', messageSchema)

export default Message;