/**
 * Hear2Heal - Express API Backend Server
 * Zero-Click AI Medical Translation & Emergency Clinical Triage Engine
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import translationRoutes from './routes/translationRoutes.js';
import triageRoutes from './routes/triageRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import transcriptRoutes from './routes/transcriptRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    service: 'Hear2Heal Medical AI Express Engine',
    version: '1.0.0',
    capabilities: [
      'ZERO_CLICK_LANGUAGE_AUTO_DETECTION',
      'REALTIME_EMERGENCY_TRIAGE_CLASSIFIER',
      'BI_DIRECTIONAL_CLINICAL_AUDIO_TRANSLATION',
      'OFFLINE_NLP_FALLBACK_ENGINE'
    ],
    timestamp: new Date().toISOString()
  });
});

// API Routes Mounting
app.use('/api', translationRoutes);
app.use('/api', triageRoutes);
app.use('/api', doctorRoutes);
app.use('/api', medicineRoutes);
app.use('/api', transcriptRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`
 🩺 Hear2Heal Medical Express Server Running!
 🚀 Listening on: http://localhost:${PORT}
 🏥 Health Check: http://localhost:${PORT}/api/health
  `);
});
