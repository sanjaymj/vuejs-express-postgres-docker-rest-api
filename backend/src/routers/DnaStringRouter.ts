import { Router } from 'express';
import DnaStringController from '../controllers/DnaStringController';

const router = Router();
const dnaStringController = new DnaStringController();

router.get('/', dnaStringController.getAllStringsFromDB);

router.get('/search-by-content', dnaStringController.getStringsWithSearchDistance);

router.post('/add', dnaStringController.addDnaStringToDatabase)

export default router;