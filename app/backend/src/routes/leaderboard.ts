import { Router } from 'express';
import leaderboard from '../controller/leaderboard';

const router = Router();

router.get('/home', leaderboard.classificationGeral);

export default router;
