import { Router } from 'express';
import Match from '../controller/match';

const router = Router();

router.get('/', Match.getListOfMatches);

export default router;
