import { Router } from 'express';
import auth from '../helper/auth';
import Match from '../controller/match';

const router = Router();

router.patch('/:id', Match.updateMatch);
router.patch('/:id/finish', Match.changeStatusInProgress);
router.get('/', Match.getListOfMatches);
router.post('/', auth.validaToken, Match.saveMatch);

export default router;
