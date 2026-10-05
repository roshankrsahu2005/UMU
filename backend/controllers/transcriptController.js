let inMemoryTranscripts = [
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
];

export const getTranscripts = (req, res) => {
  res.status(200).json({
    success: true,
    count: inMemoryTranscripts.length,
    transcripts: inMemoryTranscripts
  });
};

export const addTranscript = (req, res) => {
  const { sender, text, translatedText, sourceLang, targetLang } = req.body;

  if (!text || !translatedText) {
    return res.status(400).json({ success: false, error: 'text and translatedText are required' });
  }

  const newEntry = {
    id: String(Date.now()),
    sender: sender || 'patient',
    text,
    translatedText,
    sourceLang: sourceLang || 'Hindi',
    targetLang: targetLang || 'English',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  inMemoryTranscripts.push(newEntry);

  res.status(201).json({
    success: true,
    message: 'Transcript logged successfully',
    entry: newEntry
  });
};
