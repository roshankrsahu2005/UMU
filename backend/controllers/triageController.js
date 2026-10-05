// Emergency Protocols Catalog
const EMERGENCY_PROTOCOLS = [
  {
    id: 'airway',
    title: 'Airway & Ventilation Protocol',
    grade: 'immediate',
    icon: '🫁',
    detail: 'Apply high-flow O2 via non-rebreather mask (15L/min). Prepare intubation tray if SpO2 < 90%.',
    hindiDetail: 'हाई-फ्लो ऑक्सीजन दें। यदि SpO2 < 90% है तो इंट्यूबेशन के लिए तैयार रहें।'
  },
  {
    id: 'cardiac',
    title: 'Acute Cardiac ACS Protocol',
    grade: 'immediate',
    icon: '❤️',
    detail: 'Stat 12-lead ECG within 5 mins. Aspirin 300mg chewable + Nitroglycerin sublingual if SBP > 90 mmHg.',
    hindiDetail: '5 मिनट के भीतर 12-लीड ईसीजी करें। डिस्प्रिन/एस्पिरिन 300mg चबाने को दें।'
  },
  {
    id: 'stroke',
    title: 'Acute Ischemic Stroke Protocol',
    grade: 'high',
    icon: '🧠',
    detail: 'FAST evaluation (Face, Arm, Speech, Time). Stat non-contrast Head CT. Check blood glucose immediately.',
    hindiDetail: 'फास्ट (FAST) मूल्यांकन करें। तुरंत बिना कंट्रास्ट का हेड सीटी स्कैन कराएं।'
  },
  {
    id: 'anaphylaxis',
    title: 'Severe Anaphylaxis Protocol',
    grade: 'immediate',
    icon: '💉',
    detail: 'Inject Epinephrine (Adrenaline) 0.5mg IM outer thigh. Establish 2 large-bore IV lines.',
    hindiDetail: 'जांघ के बाहरी हिस्से में 0.5mg एड्रेनालिन इंजेक्शन तुरंत लगाएं।'
  }
];

/**
 * GET /api/emergency/protocols
 */
export const getEmergencyProtocols = (req, res) => {
  res.status(200).json({
    success: true,
    count: EMERGENCY_PROTOCOLS.length,
    protocols: EMERGENCY_PROTOCOLS
  });
};

/**
 * POST /api/triage/assess
 */
export const assessTriage = (req, res) => {
  const { symptoms = [], painScore = 5, bodyLocation = 'chest', vitals = {} } = req.body;

  let triageLevel = 'green';
  if (painScore >= 8 || symptoms.includes('chest_pain') || symptoms.includes('breathing')) {
    triageLevel = 'red';
  } else if (painScore >= 5 || symptoms.includes('fever') || symptoms.includes('headache')) {
    triageLevel = 'yellow';
  }

  res.status(200).json({
    success: true,
    triageLevel,
    painScore,
    bodyLocation,
    assignedBay: triageLevel === 'red' ? 'Trauma Bay 1 (Resuscitation)' : 'Acute Assessment Bay 4',
    recommendedProtocols: triageLevel === 'red' ? EMERGENCY_PROTOCOLS.slice(0, 2) : [EMERGENCY_PROTOCOLS[0]],
    timestamp: new Date().toISOString()
  });
};

/**
 * POST /api/emergency/sos
 */
export const triggerSOS = (req, res) => {
  const { bayId = 'Trauma Bay 1', patientName = 'Emergency Patient', reason = 'Acute Respiratory Distress' } = req.body;

  console.log(`🚨 EMERGENCY SOS BROADCAST: [${bayId}] - ${patientName} - ${reason}`);

  res.status(200).json({
    success: true,
    sosId: `SOS-${Math.floor(100000 + Math.random() * 900000)}`,
    bayId,
    status: 'ACTIVE_BROADCAST',
    notifiedTeams: ['Emergency Resuscitation Unit', 'On-Call Cardiologist', 'Nursing Supervisor'],
    hotline: '+91-11-26588500 (AIIMS Trauma Emergency Desk)',
    timestamp: new Date().toISOString()
  });
};
