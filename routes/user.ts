// __________________________________________dependencies
import { Router } from 'express';

const { getCurrentUser } = require('../controllers/users');

const router: Router = Router();

router.get('/users/me', getCurrentUser);

module.exports = router;

