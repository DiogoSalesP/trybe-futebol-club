import { Router } from 'express';
import Team from '../controller/team';

const router = Router();

router.get('/:id', Team.getById);
router.get('/', Team.getAll);

export default router;
