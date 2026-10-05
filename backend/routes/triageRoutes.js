import express from 'express';
import {
  assessTriage,
  getEmergencyProtocols,
  triggerSOS
} from '../controllers/triageController.js';

const router = express.Router();

router.post('/triage/assess', assessTriage);
router.get('/emergency/protocols', getEmergencyProtocols);
router.post('/emergency/sos', triggerSOS);

export default router;
