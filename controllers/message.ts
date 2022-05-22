import { Request, Response } from 'express';
// ______________________________________________ Message Model
import Message from '../models/message';

// ___________________________________________________________errors
const requestError = require('../middleware/errors/requestError');
// const NotFoundError = require('../middleware/errors/notFoundError');
// const ForbiddenError = require('../middleware/errors/forbiddenError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getMessages = (req: Request, res: Response) => {
    Message.find({})
        .then((messages) => res.send({ messages }))
}

module.exports.createMessage = (req: Request, res: Response) => {
    const { userId, comment } = req.body;
    Message.create({
        userId,
        comment
    })
        .then((newMessage) => {
            if (!newMessage) {
                throw new requestError('Invalid Message Information');
            }
            res.send({ newMessage });
        })
}