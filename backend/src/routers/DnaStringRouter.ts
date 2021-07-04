import { Router } from 'express';
import DnaStringController from '../controllers/DnaStringController';

const router = Router();
const dnaStringController = new DnaStringController();

router.get('/', dnaStringController.getWithSearchDistance);

router.post('/add', dnaStringController.post)

export default router;