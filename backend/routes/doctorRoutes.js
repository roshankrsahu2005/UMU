import express from 'express';
import { getDoctorPhrases, translateDoctorReply } from '../controllers/doctorController.js';

const router = express.Router();

router.get('/doctor/phrases', getDoctorPhrases);
router.post('/doctor/reply', translateDoctorReply);

export default router;
