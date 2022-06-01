import { Router } from 'express';

const { createMessage, getMessages } = require('../controllers/message');

const router: Router = Router();

router.get('/messages', getMessages);

router.post('/messages', createMessage);

module.exports = router;