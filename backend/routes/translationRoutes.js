import express from 'express';
import {
  processTranslation,
  getLanguages,
  getEmergencyPresets
} from '../controllers/translationController.js';

const router = express.Router();

router.post('/translate', processTranslation);
router.get('/languages', getLanguages);
router.get('/emergency/presets', getEmergencyPresets);

export default router;
