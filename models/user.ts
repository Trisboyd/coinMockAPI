import { Document, Model, model, Types, Schema, Query } from "mongoose";
const validator = require('validator');

export interface IUser extends Document {
    email: string;
    password: string;
    name: string
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false,
        },
    },
    password: {
        required: true,
        type: String,
        select: false
    },
});

const User: Model<IUser> = model('User', userSchema);

export default User;