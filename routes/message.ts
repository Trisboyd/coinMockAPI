import { Router } from 'express';

const { createMessage } = require('../controllers/message');

const router: Router = Router();

router.post('/messages', createMessage);

module.exports = router;