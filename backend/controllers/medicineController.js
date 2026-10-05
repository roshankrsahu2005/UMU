export const translatePrescription = (req, res) => {
  const { medicineName, dosage, instruction, targetLang = 'hi' } = req.body;

  let hindiInst = instruction;
  if (instruction && instruction.toLowerCase().includes('water')) {
    hindiInst = 'इसे तुरंत पानी में घोलकर पिएं।';
  } else if (instruction && instruction.toLowerCase().includes('tongue')) {
    hindiInst = 'इस गोली को अपनी जीभ के नीचे रखें।';
  } else {
    hindiInst = 'इसे रोजाना सुबह और रात खाना खाने के बाद लें।';
  }

  res.status(200).json({
    success: true,
    medicineName: medicineName || 'Tab. Aspirin 300mg',
    dosage: dosage || 'STAT',
    originalInstruction: instruction || 'Dissolve in water and swallow immediately',
    translatedInstruction: hindiInst,
    pictograms: ['morning_sun', 'after_meal', 'water_glass'],
    targetLang
  });
};
