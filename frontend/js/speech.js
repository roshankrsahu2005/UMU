window.Hear2HealSpeech = {
  scripts: [
    { id: 'hi', name: 'Hindi', script: 'Devanagari', regex: /[\u0900-\u097F]/, langCode: 'hi-IN' },
    { id: 'bn', name: 'Bengali', script: 'Bengali', regex: /[\u0980-\u09FF]/, langCode: 'bn-IN' },
    { id: 'ta', name: 'Tamil', script: 'Tamil', regex: /[\u0B80-\u0BFF]/, langCode: 'ta-IN' },
    { id: 'te', name: 'Telugu', script: 'Telugu', regex: /[\u0C00-\u0C7F]/, langCode: 'te-IN' },
    { id: 'gu', name: 'Gujarati', script: 'Gujarati', regex: /[\u0A80-\u0AFF]/, langCode: 'gu-IN' }
  ],

  detectLanguage: function(text) {
    if (!text || text.trim().length === 0) {
      return { lang: window.Hear2HealData.languages[0], confidence: 95, script: 'Devanagari' };
    }
    for (const s of this.scripts) {
      if (s.regex.test(text)) {
        const matchedLang = window.Hear2HealData.languages.find(l => l.id === s.id) || window.Hear2HealData.languages[0];
        return { lang: matchedLang, confidence: 97, script: s.script };
      }
    }
    const enLang = window.Hear2HealData.languages.find(l => l.id === 'en');
    return { lang: enLang, confidence: 94, script: 'Latin' };
  },

  processPatientSpeech: function(text, doctorOutputLang = 'en') {
    const detected = this.detectLanguage(text);
    const lowerText = text.toLowerCase();

    let triageLevel = 'green';
    let criticalSymptoms = ['General Consult'];
    let clinicalSummary = 'Standard clinical consultation recommended.';

    if (lowerText.includes('chest') || lowerText.includes('pain') || lowerText.includes('breath') || lowerText.includes('दर्द') || lowerText.includes('सांस') || lowerText.includes('বুকে') || lowerText.includes('நெஞ்சு')) {
      triageLevel = 'red';
      criticalSymptoms = ['Acute Chest Distress', 'Respiratory Impairment'];
      clinicalSummary = 'HIGH RISK: Suspected Acute Coronary Syndrome (ACS) or Severe Dyspnea.';
    } else if (lowerText.includes('fever') || lowerText.includes('headache') || lowerText.includes('बुखार')) {
      triageLevel = 'yellow';
      criticalSymptoms = ['High Fever', 'Headache'];
      clinicalSummary = 'URGENT: Patient presenting with high fever or abdominal symptoms.';
    }

    let englishTranslation = text;
    let hindiTranslation = text;

    const preset = window.Hear2HealData.emergencyPresets.find(p => p.patientText.trim() === text.trim());
    if (preset) {
      englishTranslation = preset.englishTranslation;
      hindiTranslation = preset.hindiTranslation;
      triageLevel = preset.triage;
      criticalSymptoms = preset.symptoms;
      clinicalSummary = preset.clinicalNote;
    }

    const doctorTranslation = doctorOutputLang === 'hi' ? hindiTranslation : englishTranslation;

    return {
      detectedLanguage: detected.lang,
      confidence: detected.confidence,
      sourceScript: detected.script,
      sourceText: text,
      doctorTranslation,
      englishTranslation,
      hindiTranslation,
      triageLevel,
      criticalSymptoms,
      clinicalSummary
    };
  },

  speakText: function(text, langCode = 'en-US') {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    window.speechSynthesis.speak(utterance);
  }
};
