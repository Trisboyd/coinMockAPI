import bcrypt from 'bcryptjs';
import { Router, Response } from 'express';
import request from '../types/request';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import payload from '../types/payload';

// errors______________________________________________________________
const RequestError = require('../middleware/errors/requestError');
const NotFoundError = require('../middleware/errors/notFoundError');

// dotenv variables______________________________
const { NODE_ENV, JWT_SECRET } = process.env;

const router: Router = Router();

module.exports.CreateUser = (req: request, res: Response) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => User.create({ name, email, password: hash }))
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
                throw new NotFoundError('no user');
            }
            else {
                return res.send({ user })
            }
        })
        .catch(error => console.log(error));
}

module.exports.login = async (req: request, res: Response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne(email);

        if (!user) {
            return Promise.reject(new AuthError('invalid'));
        }

        const isMatch: boolean = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return Promise.reject(new AuthError('invalid'));
        }

        const payload: payload = {
            userId: user.id
        }

        const token = jwt.sign(
            payload,
            NODE_ENV as string === 'production' ? JWT_SECRET as string : 'secret-key', { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    }
    catch (error) {
        console.log(error)
    }
}

