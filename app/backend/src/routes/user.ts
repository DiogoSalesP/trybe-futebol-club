import { Router } from 'express';
import Validate from '../middlewares/login';
import Users from '../controller/user';

const router = Router();

router.post('/', Validate.login, Users.getUser);

export default router;
