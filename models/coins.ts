import { Document, Model, model, Types, Schema, Query } from "mongoose";
import { IUser } from "./user";

export interface ICoin extends Document {
    userId: IUser['_id'],
    coin: string
}

const coinSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    coin: {
        type: String
    }
})

const Coin: Model<ICoin> = model('Coin', coinSchema);

export default Coin;