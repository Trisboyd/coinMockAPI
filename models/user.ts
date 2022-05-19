import { Document, Model, model, Types, Schema, Query } from "mongoose";
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../middleware/errors/authError');

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    findUserByCredentials?: () => AuthError | IUser
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

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
    return this.findOne({ email }).select('+password')
        .then((user: IUser) => {
            if (!user) {
                return Promise.reject(new AuthError('invalid'));
            }
            return bcrypt.compare(password, user.password)
                .then((matched: boolean) => {
                    if (!matched) {
                        return Promise.reject(new AuthError('invalid'));
                    }
                    return user;
                });
        });
};

const User: Model<IUser> = model('User', userSchema);

export default User;