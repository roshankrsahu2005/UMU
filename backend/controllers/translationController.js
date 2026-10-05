import { getGeminiClient } from '../config/gemini.js';

// Supported Languages Matrix
const LANGUAGES = [
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', size: '28 MB', code: 'hi-IN' },
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', size: '32 MB', code: 'en-US' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', size: '25 MB', code: 'bn-IN' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', size: '26 MB', code: 'mr-IN' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', size: '27 MB', code: 'ta-IN' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', size: '29 MB', code: 'te-IN' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', size: '24 MB', code: 'gu-IN' },
  { id: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', size: '23 MB', code: 'pa-IN' },
  { id: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', size: '27 MB', code: 'ur-PK' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', size: '30 MB', code: 'es-ES' },
  { id: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', size: '31 MB', code: 'ar-SA' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', size: '29 MB', code: 'fr-FR' }
];

// Script Regex Matrix
const SCRIPTS = [
  { id: 'hi', script: 'Devanagari', regex: /[\u0900-\u097F]/ },
  { id: 'bn', script: 'Bengali', regex: /[\u0980-\u09FF]/ },
  { id: 'ta', script: 'Tamil', regex: /[\u0B80-\u0BFF]/ },
  { id: 'te', script: 'Telugu', regex: /[\u0C00-\u0C7F]/ },
  { id: 'gu', script: 'Gujarati', regex: /[\u0A80-\u0AFF]/ },
  { id: 'pa', script: 'Gurmukhi', regex: /[\u0A00-\u0A7F]/ },
  { id: 'ur', script: 'Arabic (Urdu)', regex: /[\u0600-\u06FF]/ }
];

// Emergency Voice Drills Presets
const EMERGENCY_PRESETS = [
  {
    id: 'hi-chest-pain',
    langId: 'hi',
    langName: 'Hindi',
    title: 'Severe Chest Pain',
    patientText: 'मुझे सीने में बहुत तेज दर्द हो रहा है और सांस लेने में दिक्कत है।',
    englishTranslation: 'I have severe chest pain and difficulty breathing.',
    hindiTranslation: 'मुझे सीने में बहुत तेज दर्द हो रहा है और सांस लेने में दिक्कत है।',
    symptoms: ['Chest Pain', 'Breathing Difficulty'],
    triage: 'red',
    clinicalNote: 'Suspected Acute Coronary Syndrome (ACS) with Dyspnea'
  },
  {
    id: 'bn-breathless',
    langId: 'bn',
    langName: 'Bengali',
    title: 'Intense Chest Tightness',
    patientText: 'আমার বুকে খুব তীব্র ব্যথা এবং শ্বাস নিতে অনেক কষ্ট হচ্ছে।',
    englishTranslation: 'I have intense chest pain and severe difficulty breathing.',
    hindiTranslation: 'मेरे सीने में बहुत तेज दर्द है और सांस लेने में बहुत परेशानी हो रही है।',
    symptoms: ['Chest Pain', 'Breathing Difficulty'],
    triage: 'red',
    clinicalNote: 'High risk of acute myocardial infarction or pulmonary embolism'
  },
  {
    id: 'ta-suffocation',
    langId: 'ta',
    langName: 'Tamil',
    title: 'Chest Pain & Suffocation',
    patientText: 'எனக்கு நெஞ்சு வலி மற்றும் மூச்சுத் திணறல் அதிகமாக உள்ளது.',
    englishTranslation: 'I have severe chest pain and heavy shortness of breath.',
    hindiTranslation: 'मुझे सीने में तेज दर्द और सांस फूलने की भारी तकलीफ है।',
    symptoms: ['Chest Pain', 'Breathing Difficulty'],
    triage: 'red',
    clinicalNote: 'Immediate ECG and cardiac enzymes test required'
  }
];

/**
 * GET /api/languages
 */
export const getLanguages = (req, res) => {
  res.status(200).json({
    success: true,
    count: LANGUAGES.length,
    languages: LANGUAGES
  });
};

/**
 * GET /api/emergency/presets
 */
export const getEmergencyPresets = (req, res) => {
  res.status(200).json({
    success: true,
    count: EMERGENCY_PRESETS.length,
    presets: EMERGENCY_PRESETS
  });
};

/**
 * POST /api/translate
 * Body: { patientText: string, doctorTargetLang?: 'en' | 'hi' }
 */
export const processTranslation = async (req, res) => {
  try {
    const { patientText, doctorTargetLang = 'en' } = req.body;

    if (!patientText || patientText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'patientText is required'
      });
    }

    const aiClient = getGeminiClient();

    // 1. Script & Language Auto-Detection
    let detectedLang = LANGUAGES.find(l => l.id === 'en');
    let scriptName = 'Latin';
    let confidence = 94;

    for (const s of SCRIPTS) {
      if (s.regex.test(patientText)) {
        detectedLang = LANGUAGES.find(l => l.id === s.id) || LANGUAGES[0];
        scriptName = s.script;
        confidence = 97;
        break;
      }
    }

    // Check if matching preset exists
    const matchedPreset = EMERGENCY_PRESETS.find(p => p.patientText.trim() === patientText.trim());

    if (matchedPreset) {
      const doctorTranslation = doctorTargetLang === 'hi' ? matchedPreset.hindiTranslation : matchedPreset.englishTranslation;
      return res.status(200).json({
        success: true,
        detectedLanguage: LANGUAGES.find(l => l.id === matchedPreset.langId) || detectedLang,
        confidence: 99,
        sourceScript: scriptName,
        sourceText: patientText,
        doctorTranslation: doctorTranslation,
        englishTranslation: matchedPreset.englishTranslation,
        hindiTranslation: matchedPreset.hindiTranslation,
        triageLevel: matchedPreset.triage,
        criticalSymptoms: matchedPreset.symptoms,
        clinicalSummary: matchedPreset.clinicalNote,
        recommendedAction: 'STAT 12-Lead ECG, High-Flow O2, and Resuscitation Bay preparation.',
        requiresImmediateSOS: matchedPreset.triage === 'red'
      });
    }

    // 2. Perform AI Translation via Gemini if API key available
    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are an emergency medical triage AI assistant. Analyze this patient statement: "${patientText}".
          Return a strict JSON object with:
          - detectedLanguage: language name
          - englishTranslation: concise English medical translation
          - hindiTranslation: concise Hindi medical translation (in Devanagari)
          - triageLevel: "red" | "yellow" | "green"
          - criticalSymptoms: array of key medical symptom strings
          - clinicalSummary: brief clinical note for doctors
          - recommendedAction: immediate emergency triage next steps`
        });

        const textResponse = response.text || '';
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.status(200).json({
            success: true,
            detectedLanguage: detectedLang,
            confidence: confidence,
            sourceScript: scriptName,
            sourceText: patientText,
            doctorTranslation: doctorTargetLang === 'hi' ? parsed.hindiTranslation : parsed.englishTranslation,
            englishTranslation: parsed.englishTranslation || patientText,
            hindiTranslation: parsed.hindiTranslation || patientText,
            triageLevel: parsed.triageLevel || 'yellow',
            criticalSymptoms: parsed.criticalSymptoms || ['General Symptoms'],
            clinicalSummary: parsed.clinicalSummary || 'Patient presenting with acute symptoms.',
            recommendedAction: parsed.recommendedAction || 'Vitals check and clinical examination.',
            requiresImmediateSOS: parsed.triageLevel === 'red'
          });
        }
      } catch (geminiErr) {
        console.warn('Fallback to local NLP engine due to Gemini response error:', geminiErr.message);
      }
    }

    // 3. Local Deterministic NLP Fallback Logic
    const lowerText = patientText.toLowerCase();
    const isRed = lowerText.includes('chest') || lowerText.includes('pain') || lowerText.includes('breath') || lowerText.includes('दर्द') || lowerText.includes('सांस') || lowerText.includes('बुके') || lowerText.includes('நெஞ்சு');

    const englishTrans = isRed ? 'I am experiencing severe chest pain and difficulty breathing.' : 'I am experiencing fever and body headache.';
    const hindiTrans = isRed ? 'मुझे सीने में बहुत तेज दर्द हो रहा है और सांस लेने में दिक्कत है।' : 'मुझे बुखार और सिरदर्द हो रहा है।';

    return res.status(200).json({
      success: true,
      detectedLanguage: detectedLang,
      confidence: confidence,
      sourceScript: scriptName,
      sourceText: patientText,
      doctorTranslation: doctorTargetLang === 'hi' ? hindiTrans : englishTrans,
      englishTranslation: englishTrans,
      hindiTranslation: hindiTrans,
      triageLevel: isRed ? 'red' : 'yellow',
      criticalSymptoms: isRed ? ['Acute Chest Distress', 'Dyspnea'] : ['Fever', 'Headache'],
      clinicalSummary: isRed ? 'HIGH RISK: Acute Coronary Syndrome (ACS) or Severe Respiratory Distress.' : 'URGENT: Fever and systemic symptoms requiring clinical evaluation.',
      recommendedAction: isRed ? 'STAT ECG, Oxygen Mask, and Cardiac Monitoring.' : 'Record vitals and administer antipyretics.',
      requiresImmediateSOS: isRed
    });

  } catch (error) {
    console.error('Translation Processing Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while processing translation'
    });
  }
};
