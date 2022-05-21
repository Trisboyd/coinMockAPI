import { Response, NextFunction } from 'express';
import payload from "../types/payload";
import request from "../types/request";

// __________________________________ variables
const jwt = require('jsonwebtoken');
const authError = require('./errors/authError');

// ____________________________________________dotenv variables
const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req: request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return authError('authorization error')
    }

    const token: string = authorization.replace('Bearer ', '');
    let payload: payload;

    try {
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
    } catch (err) {
        return authError('authorization error')
    }

    req.userId = payload.userId;

    next();
}

module.exports = auth;
