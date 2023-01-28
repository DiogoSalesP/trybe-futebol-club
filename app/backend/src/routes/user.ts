import { Router } from 'express';
import Validate from '../middlewares/login';
import Users from '../controller/user';
import auth from '../helper/auth';

const router = Router();

router.post('/', Validate.login, Users.getUser);
router.get('/validate', auth.validaToken, Users.getUserByRole);

export default router;
