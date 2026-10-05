import express from 'express';
import { getTranscripts, addTranscript } from '../controllers/transcriptController.js';

const router = express.Router();

router.get('/transcripts', getTranscripts);
router.post('/transcripts', addTranscript);

export default router;
