import bcrypt from 'bcryptjs';
import { Router, Response } from 'express';
import request from '../types/request';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';
import User, { IUser } from '../models/user';

const RequestError = require('../middleware/errors/requestError');
// import { Request } from "express";
// import Payload from "./Payload";

// /**
//  * Extended Express Request interface to pass Payload Object to the request. Used by the auth middleware to pass data to the request by token signing (jwt.sign) and token verification (jwt.verify).
//  * @param userId:string
//  */
// type request = Request & Payload;

// export default request;

const router: Router = Router();

module.exports.CreateUser = (req: request, res: Response) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => User.create({ name, email, password; hash }))
        .then((user) => {
            if (!user) {
                throw new RequestError('invalid');
            }
            res.send({ _id: user._id, email: user.email });
        })
        .catch(error => console.log(error));
}

module.exports.getCurrentUser = (req: request, res: Response) => {
    User.findById(req.userId)
        .then((user) => {
            if (!user) {
                throw new NotFoundError('nouser');
            }
            else {
                return res.send({ user })
            }
        })
        .catch(error => console.log(error));
}

module.exports.login = (req: request, res: Response) => {
    const { email, password } = req.body;
    // this doesn't work yet
    // return User.findUserByCredentials(email, password)
}

//   module.exports.login = (req, res, next) => {
//     const { email, password } = req.body;
//     return User.findUserByCredentials(email, password)
//       .then((user) => {
//         if (!user) {
//           throw new AuthError(invalid);
//         } else {
//           const token = jwt.sign({ _id: user._id },
//             NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
//           res.send({ token });
//         }
//       })
//       .catch(next);
//   };