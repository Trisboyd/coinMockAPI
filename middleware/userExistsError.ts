import { Request, Response, NextFunction } from 'express';

interface Error {
    statusCode: number;
    name: string;
    code: number;
    message?: string
}

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
    console.log(error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
        res.status(409).send('User email already exists');
    }
    res.status(error.statusCode)
        .send({ message: (error.statusCode === 500) ? 'An error occurred on the server' : error.message });
    next();
};

module.exports = errorHandler;