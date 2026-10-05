const DOCTOR_REPLIES = [
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
  },
  {
    category: 'Reassurance',
    icon: '🤝',
    phrases: [
      { en: 'You are in safe hands, we are taking care of you.', hi: 'आप सुरक्षित हाथों में हैं, हम आपकी पूरी देखभाल कर रहे हैं।' },
      { en: 'Don\'t worry, the medication will relieve your pain shortly.', hi: 'चिंता न करें, दवा से जल्द ही आपका दर्द कम हो जाएगा।' }
    ]
  }
];

export const getDoctorPhrases = (req, res) => {
  res.status(200).json({
    success: true,
    categories: DOCTOR_REPLIES
  });
};

export const translateDoctorReply = (req, res) => {
  const { phraseEnglish, targetLangCode = 'hi-IN' } = req.body;

  let translated = phraseEnglish;
  if (phraseEnglish.includes('breath')) {
    translated = 'कृपया एक गहरी सांस लें और रोकें।';
  } else if (phraseEnglish.includes('safe')) {
    translated = 'आप सुरक्षित हाथों में हैं, हम आपकी पूरी देखभाल कर रहे हैं।';
  } else if (phraseEnglish.includes('tablet')) {
    translated = 'यह गोली खाना खाने के बाद दिन में दो बार लें।';
  }

  res.status(200).json({
    success: true,
    originalText: phraseEnglish,
    targetLangCode,
    translatedText: translated,
    phoneticGuide: 'Kripya ek gehri saans len aur roken.'
  });
};
