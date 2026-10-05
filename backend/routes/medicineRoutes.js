import express from 'express';
import { translatePrescription } from '../controllers/medicineController.js';

const router = express.Router();

router.post('/prescriptions/translate', translatePrescription);

export default router;
