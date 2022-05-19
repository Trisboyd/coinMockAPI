import { Request } from 'express';
import payload from './payload';

type request = Request & payload;

export default request;