window.Hear2HealData = {
  languages: [
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
  ],

  emergencyPresets: [
    {
      id: 'hi-chest-pain',
      langId: 'hi',
      langName: 'Hindi',
      flag: '🇮🇳',
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
      flag: '🇧🇩',
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
      flag: '🇮🇳',
      title: 'Chest Pain & Suffocation',
      patientText: 'எனக்கு நெஞ்சு வலி மற்றும் மூச்சுத் திணறல் அதிகமாக உள்ளது.',
      englishTranslation: 'I have severe chest pain and heavy shortness of breath.',
      hindiTranslation: 'मुझे सीने में तेज दर्द और सांस फूलने की भारी तकलीफ है।',
      symptoms: ['Chest Pain', 'Breathing Difficulty'],
      triage: 'red',
      clinicalNote: 'Immediate ECG and cardiac enzymes test required'
    }
  ],

  quickSymptoms: [
    { id: 'chest_pain', name: 'Chest Pain', hindiName: 'सीने में दर्द', icon: '❤️', color: 'red' },
    { id: 'breathing', name: 'Breathing Difficulty', hindiName: 'सांस में दिक्कत', icon: '🫁', color: 'red' },
    { id: 'fever', name: 'High Fever', hindiName: 'तेज बुखार', icon: '🌡️', color: 'orange' },
    { id: 'headache', name: 'Severe Headache', hindiName: 'तेज सिरदर्द', icon: '🧠', color: 'orange' },
    { id: 'stomach', name: 'Stomach Pain', hindiName: 'पेट दर्द', icon: '🤢', color: 'yellow' },
    { id: 'vomiting', name: 'Vomiting / Nausea', hindiName: 'उल्टी / मिचली', icon: '🤮', color: 'yellow' }
  ],

  doctorReplies: [
    {
      category: 'Examinations',
      icon: '🩺',
      phrases: [
        { en: 'Please take a deep breath in and hold.', hi: 'कृपया एक गहरी सांस लें और रोकें।' },
        { en: 'Point with one finger where it hurts the most.', hi: 'अपनी एक उंगली से दिखाएं कि सबसे ज्यादा दर्द कहां है।' },
        { en: 'Open your mouth and say Ahh.', hi: 'अपना मुंह खोलें और आह कहें।' }
      ]
    },
    {
      category: 'Medications',
      icon: '💊',
      phrases: [
        { en: 'Take this tablet twice daily after meals.', hi: 'यह गोली खाना खाने के बाद दिन में दो बार लें।' },
        { en: 'Keep this tablet under your tongue immediately.', hi: 'इस गोली को तुरंत अपनी जीभ के नीचे रखें।' }
      ]
    }
  ],

  bodyMapPoints: [
    { id: 'head', name: 'Head & Brain', hindiName: 'सिर और मस्तिष्क', x: 50, y: 12, view: 'front' },
    { id: 'throat', name: 'Throat & Neck', hindiName: 'गला और गर्दन', x: 50, y: 22, view: 'front' },
    { id: 'chest', name: 'Chest & Heart', hindiName: 'सीना और हृदय', x: 50, y: 33, view: 'front' },
    { id: 'abdomen', name: 'Abdomen & Stomach', hindiName: 'पेट और आंतें', x: 50, y: 46, view: 'front' },
    { id: 'l_arm', name: 'Left Arm & Shoulder', hindiName: 'बायां हाथ', x: 28, y: 38, view: 'front' },
    { id: 'r_arm', name: 'Right Arm & Shoulder', hindiName: 'दायां हाथ', x: 72, y: 38, view: 'front' }
  ],

  emergencyProtocols: [
    {
      id: 'airway',
      title: 'Airway & Ventilation Protocol',
      icon: '🫁',
      detail: 'Apply high-flow O2 via non-rebreather mask (15L/min). Prepare intubation tray if SpO2 < 90%.'
    },
    {
      id: 'cardiac',
      title: 'Acute Cardiac ACS Protocol',
      icon: '❤️',
      detail: 'Stat 12-lead ECG within 5 mins. Aspirin 300mg chewable + Nitroglycerin sublingual.'
    }
  ],

  initialTranscripts: [
    {
      id: '1',
      sender: 'patient',
      text: 'मुझे सीने में बहुत तेज दर्द हो रहा है और सांस लेने में दिक्कत है।',
      translatedText: 'I have severe chest pain and difficulty breathing.',
      sourceLang: 'Hindi (हिन्दी)',
      targetLang: 'English',
      timestamp: '10:42 AM'
    },
    {
      id: '2',
      sender: 'doctor',
      text: 'Please lie down on the bed. We are starting oxygen and taking an ECG right now.',
      translatedText: 'कृपया बिस्तर पर लेट जाएं। हम ऑक्सीजन शुरू कर रहे हैं और अभी ईसीजी ले रहे हैं।',
      sourceLang: 'English',
      targetLang: 'Hindi (हिन्दी)',
      timestamp: '10:43 AM'
    }
  ]
};
