export type LangCode = 'en' | 'hi' | 'pa' | 'mr' | 'bn' | 'kn' | 'gu';

export const LANGUAGES: { code: LangCode; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
];

type TranslationStrings = {
  // Tabs & Navigation
  profiles: string;
  settings: string;
  back: string;

  // Profile list
  searchPlaceholder: string;
  noProfilesTitle: string;
  noProfilesSubtitle: string;
  noResults: string;
  noResultsSubtitle: string;

  // Profile actions
  newProfile: string;
  createProfile: string;
  creating: string;
  name: string;
  namePlaceholder: string;
  notesOptional: string;
  notesPlaceholder: string;
  pickFromContacts: string;
  linkedTo: string;
  remove: string;
  linkToContact: string;
  unlinkContact: string;
  deleteProfile: string;
  deleteProfileConfirm: string;
  cancel: string;
  delete: string;

  // Measurements
  noMeasurementsTitle: string;
  noMeasurementsSubtitle: string;
  addMeasurement: string;
  chooseCategory: string;
  add: string;
  nameOptional: string;
  nameExamplePlaceholder: string;
  enterValue: string;
  deleteMeasurement: string;
  deleteMeasurementConfirm: string;
  noMeasurementsAdded: string;

  // Categories
  catTshirt: string;
  catShirt: string;
  catSuit: string;
  catPant: string;
  catShoes: string;
  catEyeglasses: string;
  catRing: string;
  catBangles: string;
  catBody: string;

  // Field labels
  fieldSize: string;
  fieldChest: string;
  fieldLength: string;
  fieldWaist: string;
  fieldShoulder: string;
  fieldSleeve: string;
  fieldJacketLength: string;
  fieldLensWidth: string;
  fieldBridge: string;
  fieldTemple: string;
  fieldLensHeight: string;
  fieldPD: string;
  fieldSphLeft: string;
  fieldSphRight: string;
  fieldCylLeft: string;
  fieldCylRight: string;
  fieldSizeUS: string;
  fieldSizeUK: string;
  fieldDiameter: string;
  fieldCircumference: string;
  fieldHeight: string;
  fieldWeight: string;
  fieldHip: string;
  fieldHips: string;
  fieldThigh: string;
  fieldKnee: string;
  fieldCrotch: string;
  fieldInseam: string;
  fieldLegOpening: string;
  fieldNeck: string;
  left: string;
  right: string;

  // Share
  share: string;
  shareMeasurements: string;
  shareLanguage: string;
  saveInApp: string;

  // Settings
  about: string;
  version: string;
  dataInfo: string;
  appLanguage: string;
  defaultShareLanguage: string;

  // Import
  import: string;
  sharedMeasurement: string;
  invalidLink: string;
  invalidLinkMessage: string;
  saveToProfile: string;
  noProfilesYet: string;
  saveMeasurement: string;
  saving: string;
  saved: string;
  savedMessage: string;
  ok: string;

  // Permissions
  permissionDenied: string;
  permissionMessage: string;
  error: string;
  enterName: string;

  // Profile not found
  profileNotFound: string;
  entryNotFound: string;
};

const en: TranslationStrings = {
  profiles: 'Profiles',
  settings: 'Settings',
  back: 'Back',

  searchPlaceholder: 'Search by name or phone number',
  noProfilesTitle: 'No profiles yet',
  noProfilesSubtitle: 'Create a profile to start saving measurements',
  noResults: 'No results',
  noResultsSubtitle: 'Try a different name or number',

  newProfile: 'New Profile',
  createProfile: 'Create Profile',
  creating: 'Creating...',
  name: 'Name',
  namePlaceholder: 'e.g. John, Mom, Self',
  notesOptional: 'Notes (optional)',
  notesPlaceholder: 'Any notes about this person',
  pickFromContacts: 'Pick from contacts',
  linkedTo: 'Linked to',
  remove: 'Remove',
  linkToContact: 'Link to contact',
  unlinkContact: 'Unlink contact',
  deleteProfile: 'Delete Profile',
  deleteProfileConfirm: 'Delete "{name}" and all their measurements?',
  cancel: 'Cancel',
  delete: 'Delete',

  noMeasurementsTitle: 'No measurements yet',
  noMeasurementsSubtitle: 'Tap + to add clothing, eyeglasses, shoes, or other measurements',
  addMeasurement: 'Add Measurement',
  chooseCategory: 'Choose a category',
  add: 'Add',
  nameOptional: 'Name (optional)',
  nameExamplePlaceholder: 'e.g. "Formal", "Running"',
  enterValue: 'Enter {label}',
  deleteMeasurement: 'Delete Measurement',
  deleteMeasurementConfirm: 'Are you sure?',
  noMeasurementsAdded: 'No measurements added',

  catTshirt: 'T-Shirt',
  catShirt: 'Shirt',
  catSuit: 'Suit / Blazer',
  catPant: 'Pant',
  catShoes: 'Shoes',
  catEyeglasses: 'Eyeglasses',
  catRing: 'Ring',
  catBangles: 'Bangles',
  catBody: 'Body',

  fieldSize: 'Size',
  fieldChest: 'Chest',
  fieldLength: 'Length',
  fieldWaist: 'Waist',
  fieldShoulder: 'Shoulder',
  fieldSleeve: 'Sleeve Length',
  fieldJacketLength: 'Jacket Length',
  fieldLensWidth: 'Lens Width',
  fieldBridge: 'Bridge',
  fieldTemple: 'Temple Length',
  fieldLensHeight: 'Lens Height',
  fieldPD: 'Pupillary Distance (PD)',
  fieldSphLeft: 'SPH (Left)',
  fieldSphRight: 'SPH (Right)',
  fieldCylLeft: 'CYL (Left)',
  fieldCylRight: 'CYL (Right)',
  fieldSizeUS: 'Size (US)',
  fieldSizeUK: 'Size (UK)',
  fieldDiameter: 'Inner Diameter',
  fieldCircumference: 'Circumference',
  fieldHeight: 'Height',
  fieldWeight: 'Weight',
  fieldHip: 'Hip',
  fieldHips: 'Hips',
  fieldThigh: 'Thigh',
  fieldKnee: 'Knee',
  fieldCrotch: 'Crotch',
  fieldInseam: 'Inseam',
  fieldLegOpening: 'Leg Opening',
  fieldNeck: 'Neck',
  left: 'Left',
  right: 'Right',

  share: 'Share',
  shareMeasurements: '{name}\'s {category} measurements',
  shareLanguage: 'Share language',
  saveInApp: 'Save in app',

  about: 'About',
  version: 'Version',
  dataInfo: 'All your measurements are stored locally on this device.',
  appLanguage: 'App Language',
  defaultShareLanguage: 'Default Share Language',

  import: 'Import',
  sharedMeasurement: 'Shared Measurement',
  invalidLink: 'Invalid Link',
  invalidLinkMessage: 'Could not read the shared measurement.',
  saveToProfile: 'Save to profile',
  noProfilesYet: 'No profiles yet. Create one first from the home screen.',
  saveMeasurement: 'Save Measurement',
  saving: 'Saving...',
  saved: 'Saved',
  savedMessage: 'Measurement has been saved to the selected profile.',
  ok: 'OK',

  permissionDenied: 'Permission Denied',
  permissionMessage: 'Allow access to contacts in your phone settings.',
  error: 'Error',
  enterName: 'Please enter a name',

  profileNotFound: 'Profile not found',
  entryNotFound: 'Entry not found',
};

const hi: TranslationStrings = {
  profiles: 'प्रोफ़ाइल',
  settings: 'सेटिंग्स',
  back: 'वापस',

  searchPlaceholder: 'नाम या फ़ोन नंबर से खोजें',
  noProfilesTitle: 'कोई प्रोफ़ाइल नहीं',
  noProfilesSubtitle: 'माप सहेजने के लिए प्रोफ़ाइल बनाएं',
  noResults: 'कोई परिणाम नहीं',
  noResultsSubtitle: 'दूसरा नाम या नंबर आज़माएं',

  newProfile: 'नई प्रोफ़ाइल',
  createProfile: 'प्रोफ़ाइल बनाएं',
  creating: 'बना रहे हैं...',
  name: 'नाम',
  namePlaceholder: 'जैसे राम, माँ, खुद',
  notesOptional: 'नोट्स (वैकल्पिक)',
  notesPlaceholder: 'इस व्यक्ति के बारे में कोई नोट',
  pickFromContacts: 'कॉन्टैक्ट से चुनें',
  linkedTo: 'लिंक किया गया',
  remove: 'हटाएं',
  linkToContact: 'कॉन्टैक्ट से जोड़ें',
  unlinkContact: 'कॉन्टैक्ट हटाएं',
  deleteProfile: 'प्रोफ़ाइल हटाएं',
  deleteProfileConfirm: '"{name}" और उनके सभी माप हटाएं?',
  cancel: 'रद्द करें',
  delete: 'हटाएं',

  noMeasurementsTitle: 'अभी कोई माप नहीं',
  noMeasurementsSubtitle: 'कपड़े, चश्मा, जूते या अन्य माप जोड़ने के लिए + दबाएं',
  addMeasurement: 'माप जोड़ें',
  chooseCategory: 'श्रेणी चुनें',
  add: 'जोड़ें',
  nameOptional: 'नाम (वैकल्पिक)',
  nameExamplePlaceholder: 'जैसे "फ़ॉर्मल", "रनिंग"',
  enterValue: '{label} दर्ज करें',
  deleteMeasurement: 'माप हटाएं',
  deleteMeasurementConfirm: 'क्या आप वाकई हटाना चाहते हैं?',
  noMeasurementsAdded: 'कोई माप नहीं जोड़ा',

  catTshirt: 'टी-शर्ट',
  catShirt: 'शर्ट',
  catSuit: 'सूट / ब्लेज़र',
  catPant: 'पैंट',
  catShoes: 'जूते',
  catEyeglasses: 'चश्मा',
  catRing: 'अंगूठी',
  catBangles: 'चूड़ियां',
  catBody: 'शरीर',

  fieldSize: 'साइज़',
  fieldChest: 'छाती',
  fieldLength: 'लंबाई',
  fieldWaist: 'कमर',
  fieldShoulder: 'कंधा',
  fieldSleeve: 'आस्तीन की लंबाई',
  fieldJacketLength: 'जैकेट की लंबाई',
  fieldLensWidth: 'लेंस की चौड़ाई',
  fieldBridge: 'ब्रिज',
  fieldTemple: 'टेम्पल की लंबाई',
  fieldLensHeight: 'लेंस की ऊंचाई',
  fieldPD: 'पुतली की दूरी (PD)',
  fieldSphLeft: 'SPH (बायां)',
  fieldSphRight: 'SPH (दायां)',
  fieldCylLeft: 'CYL (बायां)',
  fieldCylRight: 'CYL (दायां)',
  fieldSizeUS: 'साइज़ (US)',
  fieldSizeUK: 'साइज़ (UK)',
  fieldDiameter: 'भीतरी व्यास',
  fieldCircumference: 'परिधि',
  fieldHeight: 'ऊंचाई',
  fieldWeight: 'वज़न',
  fieldHip: 'कूल्हा',
  fieldHips: 'कूल्हे',
  fieldThigh: 'जांघ',
  fieldKnee: 'घुटना',
  fieldCrotch: 'क्रॉच',
  fieldInseam: 'इनसीम',
  fieldLegOpening: 'पायचा',
  fieldNeck: 'गर्दन',
  left: 'बायाँ',
  right: 'दायाँ',

  share: 'शेयर करें',
  shareMeasurements: '{name} की {category} की माप',
  shareLanguage: 'शेयर भाषा',
  saveInApp: 'ऐप में सेव करें',

  about: 'जानकारी',
  version: 'संस्करण',
  dataInfo: 'आपके सभी माप इस डिवाइस पर स्थानीय रूप से सहेजे गए हैं।',
  appLanguage: 'ऐप की भाषा',
  defaultShareLanguage: 'डिफ़ॉल्ट शेयर भाषा',

  import: 'आयात',
  sharedMeasurement: 'साझा की गई माप',
  invalidLink: 'अमान्य लिंक',
  invalidLinkMessage: 'साझा की गई माप पढ़ नहीं सकी।',
  saveToProfile: 'प्रोफ़ाइल में सहेजें',
  noProfilesYet: 'अभी कोई प्रोफ़ाइल नहीं है। पहले होम स्क्रीन से एक बनाएं।',
  saveMeasurement: 'माप सहेजें',
  saving: 'सहेज रहे हैं...',
  saved: 'सहेजा गया',
  savedMessage: 'माप चयनित प्रोफ़ाइल में सहेजी गई है।',
  ok: 'ठीक है',

  permissionDenied: 'अनुमति अस्वीकृत',
  permissionMessage: 'अपने फ़ोन सेटिंग्स में कॉन्टैक्ट की अनुमति दें।',
  error: 'त्रुटि',
  enterName: 'कृपया नाम दर्ज करें',

  profileNotFound: 'प्रोफ़ाइल नहीं मिली',
  entryNotFound: 'एंट्री नहीं मिली',
};

const pa: TranslationStrings = {
  profiles: 'ਪ੍ਰੋਫਾਈਲ',
  settings: 'ਸੈਟਿੰਗਾਂ',
  back: 'ਵਾਪਸ',

  searchPlaceholder: 'ਨਾਮ ਜਾਂ ਫ਼ੋਨ ਨੰਬਰ ਨਾਲ ਖੋਜੋ',
  noProfilesTitle: 'ਕੋਈ ਪ੍ਰੋਫਾਈਲ ਨਹੀਂ',
  noProfilesSubtitle: 'ਮਾਪ ਸੇਵ ਕਰਨ ਲਈ ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ',
  noResults: 'ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ',
  noResultsSubtitle: 'ਕੋਈ ਹੋਰ ਨਾਮ ਜਾਂ ਨੰਬਰ ਅਜ਼ਮਾਓ',

  newProfile: 'ਨਵੀਂ ਪ੍ਰੋਫਾਈਲ',
  createProfile: 'ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ',
  creating: 'ਬਣਾ ਰਿਹਾ ਹੈ...',
  name: 'ਨਾਮ',
  namePlaceholder: 'ਜਿਵੇਂ ਰਾਮ, ਮਾਂ, ਆਪ',
  notesOptional: 'ਨੋਟਸ (ਵਿਕਲਪਿਕ)',
  notesPlaceholder: 'ਇਸ ਵਿਅਕਤੀ ਬਾਰੇ ਕੋਈ ਨੋਟ',
  pickFromContacts: 'ਕਾਂਟੈਕਟ ਤੋਂ ਚੁਣੋ',
  linkedTo: 'ਜੁੜਿਆ ਹੋਇਆ',
  remove: 'ਹਟਾਓ',
  linkToContact: 'ਕਾਂਟੈਕਟ ਨਾਲ ਜੋੜੋ',
  unlinkContact: 'ਕਾਂਟੈਕਟ ਹਟਾਓ',
  deleteProfile: 'ਪ੍ਰੋਫਾਈਲ ਮਿਟਾਓ',
  deleteProfileConfirm: '"{name}" ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਾਰੇ ਮਾਪ ਮਿਟਾਓ?',
  cancel: 'ਰੱਦ ਕਰੋ',
  delete: 'ਮਿਟਾਓ',

  noMeasurementsTitle: 'ਅਜੇ ਕੋਈ ਮਾਪ ਨਹੀਂ',
  noMeasurementsSubtitle: 'ਕੱਪੜੇ, ਐਨਕਾਂ, ਜੁੱਤੀ ਜਾਂ ਹੋਰ ਮਾਪ ਜੋੜਨ ਲਈ + ਦਬਾਓ',
  addMeasurement: 'ਮਾਪ ਜੋੜੋ',
  chooseCategory: 'ਸ਼੍ਰੇਣੀ ਚੁਣੋ',
  add: 'ਜੋੜੋ',
  nameOptional: 'ਨਾਮ (ਵਿਕਲਪਿਕ)',
  nameExamplePlaceholder: 'ਜਿਵੇਂ "ਫ਼ਾਰਮਲ", "ਰਨਿੰਗ"',
  enterValue: '{label} ਦਾਖ਼ਲ ਕਰੋ',
  deleteMeasurement: 'ਮਾਪ ਮਿਟਾਓ',
  deleteMeasurementConfirm: 'ਕੀ ਤੁਸੀਂ ਪੱਕਾ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
  noMeasurementsAdded: 'ਕੋਈ ਮਾਪ ਨਹੀਂ ਜੋੜਿਆ',

  catTshirt: 'ਟੀ-ਸ਼ਰਟ',
  catShirt: 'ਸ਼ਰਟ',
  catSuit: 'ਸੂਟ / ਬਲੇਜ਼ਰ',
  catPant: 'ਪੈਂਟ',
  catShoes: 'ਜੁੱਤੀ',
  catEyeglasses: 'ਐਨਕਾਂ',
  catRing: 'ਮੁੰਦਰੀ',
  catBangles: 'ਚੂੜੀਆਂ',
  catBody: 'ਸਰੀਰ',

  fieldSize: 'ਸਾਈਜ਼',
  fieldChest: 'ਛਾਤੀ',
  fieldLength: 'ਲੰਬਾਈ',
  fieldWaist: 'ਕਮਰ',
  fieldShoulder: 'ਮੋਢਾ',
  fieldSleeve: 'ਬਾਂਹ ਦੀ ਲੰਬਾਈ',
  fieldJacketLength: 'ਜੈਕੇਟ ਦੀ ਲੰਬਾਈ',
  fieldLensWidth: 'ਲੈਂਸ ਦੀ ਚੌੜਾਈ',
  fieldBridge: 'ਬ੍ਰਿਜ',
  fieldTemple: 'ਟੈਂਪਲ ਦੀ ਲੰਬਾਈ',
  fieldLensHeight: 'ਲੈਂਸ ਦੀ ਉਚਾਈ',
  fieldPD: 'ਪੁਤਲੀ ਦੀ ਦੂਰੀ (PD)',
  fieldSphLeft: 'SPH (ਖੱਬਾ)',
  fieldSphRight: 'SPH (ਸੱਜਾ)',
  fieldCylLeft: 'CYL (ਖੱਬਾ)',
  fieldCylRight: 'CYL (ਸੱਜਾ)',
  fieldSizeUS: 'ਸਾਈਜ਼ (US)',
  fieldSizeUK: 'ਸਾਈਜ਼ (UK)',
  fieldDiameter: 'ਅੰਦਰੂਨੀ ਵਿਆਸ',
  fieldCircumference: 'ਘੇਰਾ',
  fieldHeight: 'ਉਚਾਈ',
  fieldWeight: 'ਭਾਰ',
  fieldHip: 'ਕੁੱਲ੍ਹਾ',
  fieldHips: 'ਕੁੱਲ੍ਹੇ',
  fieldThigh: 'ਪੱਟ',
  fieldKnee: 'ਗੋਡਾ',
  fieldCrotch: 'ਕ੍ਰੌਚ',
  fieldInseam: 'ਇਨਸੀਮ',
  fieldLegOpening: 'ਲੱਤ ਖੁੱਲ੍ਹ',
  fieldNeck: 'ਗਰਦਨ',
  left: 'ਖੱਬਾ',
  right: 'ਸੱਜਾ',

  share: 'ਸ਼ੇਅਰ ਕਰੋ',
  shareMeasurements: '{name} ਦੀ {category} ਦੇ ਮਾਪ',
  shareLanguage: 'ਸ਼ੇਅਰ ਭਾਸ਼ਾ',
  saveInApp: 'ਐਪ ਵਿੱਚ ਸੇਵ ਕਰੋ',

  about: 'ਜਾਣਕਾਰੀ',
  version: 'ਸੰਸਕਰਣ',
  dataInfo: 'ਤੁਹਾਡੇ ਸਾਰੇ ਮਾਪ ਇਸ ਡਿਵਾਈਸ ਤੇ ਸੇਵ ਹਨ।',
  appLanguage: 'ਐਪ ਦੀ ਭਾਸ਼ਾ',
  defaultShareLanguage: 'ਡਿਫ਼ਾਲਟ ਸ਼ੇਅਰ ਭਾਸ਼ਾ',

  import: 'ਆਯਾਤ',
  sharedMeasurement: 'ਸਾਂਝੀ ਕੀਤੀ ਮਾਪ',
  invalidLink: 'ਅਵੈਧ ਲਿੰਕ',
  invalidLinkMessage: 'ਸਾਂਝੀ ਕੀਤੀ ਮਾਪ ਪੜ੍ਹ ਨਹੀਂ ਸਕੀ।',
  saveToProfile: 'ਪ੍ਰੋਫ਼ਾਈਲ ਵਿੱਚ ਸੇਵ ਕਰੋ',
  noProfilesYet: 'ਅਜੇ ਕੋਈ ਪ੍ਰੋਫ਼ਾਈਲ ਨਹੀਂ। ਪਹਿਲਾਂ ਹੋਮ ਸਕ੍ਰੀਨ ਤੋਂ ਬਣਾਓ।',
  saveMeasurement: 'ਮਾਪ ਸੇਵ ਕਰੋ',
  saving: 'ਸੇਵ ਹੋ ਰਿਹਾ...',
  saved: 'ਸੇਵ ਹੋ ਗਿਆ',
  savedMessage: 'ਮਾਪ ਚੁਣੀ ਪ੍ਰੋਫ਼ਾਈਲ ਵਿੱਚ ਸੇਵ ਹੋ ਗਈ।',
  ok: 'ਠੀਕ ਹੈ',

  permissionDenied: 'ਇਜਾਜ਼ਤ ਅਸਵੀਕਾਰ',
  permissionMessage: 'ਆਪਣੇ ਫ਼ੋਨ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਕਾਂਟੈਕਟ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ।',
  error: 'ਗਲਤੀ',
  enterName: 'ਕਿਰਪਾ ਕਰਕੇ ਨਾਮ ਦਾਖ਼ਲ ਕਰੋ',

  profileNotFound: 'ਪ੍ਰੋਫਾਈਲ ਨਹੀਂ ਮਿਲੀ',
  entryNotFound: 'ਐਂਟਰੀ ਨਹੀਂ ਮਿਲੀ',
};

const mr: TranslationStrings = {
  profiles: 'प्रोफाइल',
  settings: 'सेटिंग्ज',
  back: 'मागे',

  searchPlaceholder: 'नाव किंवा फोन नंबरने शोधा',
  noProfilesTitle: 'प्रोफाइल नाही',
  noProfilesSubtitle: 'माप जतन करण्यासाठी प्रोफाइल तयार करा',
  noResults: 'परिणाम नाही',
  noResultsSubtitle: 'वेगळे नाव किंवा नंबर वापरा',

  newProfile: 'नवीन प्रोफाइल',
  createProfile: 'प्रोफाइल तयार करा',
  creating: 'तयार करत आहे...',
  name: 'नाव',
  namePlaceholder: 'उदा. राम, आई, स्वतः',
  notesOptional: 'टिपा (ऐच्छिक)',
  notesPlaceholder: 'या व्यक्तीबद्दल काही टिपा',
  pickFromContacts: 'कॉन्टॅक्टमधून निवडा',
  linkedTo: 'जोडले',
  remove: 'काढा',
  linkToContact: 'कॉन्टॅक्टशी जोडा',
  unlinkContact: 'कॉन्टॅक्ट काढा',
  deleteProfile: 'प्रोफाइल हटवा',
  deleteProfileConfirm: '"{name}" आणि त्यांचे सर्व माप हटवायचे?',
  cancel: 'रद्द करा',
  delete: 'हटवा',

  noMeasurementsTitle: 'अजून माप नाही',
  noMeasurementsSubtitle: 'कपडे, चष्मा, बूट किंवा इतर माप जोडण्यासाठी + दाबा',
  addMeasurement: 'माप जोडा',
  chooseCategory: 'वर्ग निवडा',
  add: 'जोडा',
  nameOptional: 'नाव (ऐच्छिक)',
  nameExamplePlaceholder: 'उदा. "फॉर्मल", "रनिंग"',
  enterValue: '{label} टाका',
  deleteMeasurement: 'माप हटवा',
  deleteMeasurementConfirm: 'तुम्हाला खात्री आहे?',
  noMeasurementsAdded: 'माप जोडले नाही',

  catTshirt: 'टी-शर्ट',
  catShirt: 'शर्ट',
  catSuit: 'सूट / ब्लेझर',
  catPant: 'पँट',
  catShoes: 'बूट',
  catEyeglasses: 'चष्मा',
  catRing: 'अंगठी',
  catBangles: 'बांगड्या',
  catBody: 'शरीर',

  fieldSize: 'आकार',
  fieldChest: 'छाती',
  fieldLength: 'लांबी',
  fieldWaist: 'कंबर',
  fieldShoulder: 'खांदा',
  fieldSleeve: 'बाहीची लांबी',
  fieldJacketLength: 'जॅकेटची लांबी',
  fieldLensWidth: 'लेन्सची रुंदी',
  fieldBridge: 'ब्रिज',
  fieldTemple: 'टेम्पलची लांबी',
  fieldLensHeight: 'लेन्सची उंची',
  fieldPD: 'बाहुल्याचे अंतर (PD)',
  fieldSphLeft: 'SPH (डावा)',
  fieldSphRight: 'SPH (उजवा)',
  fieldCylLeft: 'CYL (डावा)',
  fieldCylRight: 'CYL (उजवा)',
  fieldSizeUS: 'आकार (US)',
  fieldSizeUK: 'आकार (UK)',
  fieldDiameter: 'आतील व्यास',
  fieldCircumference: 'परिघ',
  fieldHeight: 'उंची',
  fieldWeight: 'वजन',
  fieldHip: 'कूल्हा',
  fieldHips: 'नितंब',
  fieldThigh: 'मांडी',
  fieldKnee: 'गुडघा',
  fieldCrotch: 'क्रॉच',
  fieldInseam: 'इनसीम',
  fieldLegOpening: 'पायाचा मोहरा',
  fieldNeck: 'मान',
  left: 'डावा',
  right: 'उजवा',

  share: 'शेअर करा',
  shareMeasurements: '{name} चे {category} माप',
  shareLanguage: 'शेअर भाषा',
  saveInApp: 'ॲपमध्ये सेव्ह करा',

  about: 'माहिती',
  version: 'आवृत्ती',
  dataInfo: 'तुमचे सर्व माप या डिव्हाइसवर स्थानिकरित्या जतन केले आहेत.',
  appLanguage: 'ॲपची भाषा',
  defaultShareLanguage: 'डीफॉल्ट शेअर भाषा',

  import: 'आयात',
  sharedMeasurement: 'शेअर केलेले माप',
  invalidLink: 'अवैध लिंक',
  invalidLinkMessage: 'शेअर केलेले माप वाचता आले नाही.',
  saveToProfile: 'प्रोफाइलमध्ये सेव करा',
  noProfilesYet: 'अजून प्रोफाइल नाही. आधी होम स्क्रीनवरून तयार करा.',
  saveMeasurement: 'माप सेव करा',
  saving: 'सेव होत आहे...',
  saved: 'सेव झाले',
  savedMessage: 'माप निवडलेल्या प्रोफाइलमध्ये सेव झाले.',
  ok: 'ठीक आहे',

  permissionDenied: 'परवानगी नाकारली',
  permissionMessage: 'तुमच्या फोन सेटिंग्जमध्ये कॉन्टॅक्ट परवानगी द्या.',
  error: 'त्रुटी',
  enterName: 'कृपया नाव टाका',

  profileNotFound: 'प्रोफाइल सापडले नाही',
  entryNotFound: 'एंट्री सापडली नाही',
};

const bn: TranslationStrings = {
  profiles: 'প্রোফাইল',
  settings: 'সেটিংস',
  back: 'পিছনে',

  searchPlaceholder: 'নাম বা ফোন নম্বর দিয়ে খুঁজুন',
  noProfilesTitle: 'কোনো প্রোফাইল নেই',
  noProfilesSubtitle: 'মাপ সংরক্ষণ করতে প্রোফাইল তৈরি করুন',
  noResults: 'কোনো ফলাফল নেই',
  noResultsSubtitle: 'অন্য নাম বা নম্বর চেষ্টা করুন',

  newProfile: 'নতুন প্রোফাইল',
  createProfile: 'প্রোফাইল তৈরি করুন',
  creating: 'তৈরি হচ্ছে...',
  name: 'নাম',
  namePlaceholder: 'যেমন রাম, মা, নিজে',
  notesOptional: 'নোট (ঐচ্ছিক)',
  notesPlaceholder: 'এই ব্যক্তির সম্পর্কে কোনো নোট',
  pickFromContacts: 'পরিচিতি থেকে বেছে নিন',
  linkedTo: 'যুক্ত',
  remove: 'সরান',
  linkToContact: 'পরিচিতির সাথে যুক্ত করুন',
  unlinkContact: 'পরিচিতি সরান',
  deleteProfile: 'প্রোফাইল মুছুন',
  deleteProfileConfirm: '"{name}" এবং তার সমস্ত মাপ মুছবেন?',
  cancel: 'বাতিল',
  delete: 'মুছুন',

  noMeasurementsTitle: 'এখনো কোনো মাপ নেই',
  noMeasurementsSubtitle: 'পোশাক, চশমা, জুতা বা অন্যান্য মাপ যোগ করতে + চাপুন',
  addMeasurement: 'মাপ যোগ করুন',
  chooseCategory: 'বিভাগ বেছে নিন',
  add: 'যোগ করুন',
  nameOptional: 'নাম (ঐচ্ছিক)',
  nameExamplePlaceholder: 'যেমন "ফর্মাল", "রানিং"',
  enterValue: '{label} লিখুন',
  deleteMeasurement: 'মাপ মুছুন',
  deleteMeasurementConfirm: 'আপনি কি নিশ্চিত?',
  noMeasurementsAdded: 'কোনো মাপ যোগ করা হয়নি',

  catTshirt: 'টি-শার্ট',
  catShirt: 'শার্ট',
  catSuit: 'স্যুট / ব্লেজার',
  catPant: 'প্যান্ট',
  catShoes: 'জুতা',
  catEyeglasses: 'চশমা',
  catRing: 'আংটি',
  catBangles: 'চুড়ি',
  catBody: 'শরীর',

  fieldSize: 'সাইজ',
  fieldChest: 'বুক',
  fieldLength: 'দৈর্ঘ্য',
  fieldWaist: 'কোমর',
  fieldShoulder: 'কাঁধ',
  fieldSleeve: 'হাতার দৈর্ঘ্য',
  fieldJacketLength: 'জ্যাকেটের দৈর্ঘ্য',
  fieldLensWidth: 'লেন্সের প্রস্থ',
  fieldBridge: 'ব্রিজ',
  fieldTemple: 'টেম্পলের দৈর্ঘ্য',
  fieldLensHeight: 'লেন্সের উচ্চতা',
  fieldPD: 'চোখের দূরত্ব (PD)',
  fieldSphLeft: 'SPH (বাম)',
  fieldSphRight: 'SPH (ডান)',
  fieldCylLeft: 'CYL (বাম)',
  fieldCylRight: 'CYL (ডান)',
  fieldSizeUS: 'সাইজ (US)',
  fieldSizeUK: 'সাইজ (UK)',
  fieldDiameter: 'অভ্যন্তরীণ ব্যাস',
  fieldCircumference: 'পরিধি',
  fieldHeight: 'উচ্চতা',
  fieldWeight: 'ওজন',
  fieldHip: 'নিতম্ব',
  fieldHips: 'নিতম্ব',
  fieldThigh: 'উরু',
  fieldKnee: 'হাঁটু',
  fieldCrotch: 'ক্রচ',
  fieldInseam: 'ইনসিম',
  fieldLegOpening: 'পায়ের মুখ',
  fieldNeck: 'গলা',
  left: 'বাম',
  right: 'ডান',

  share: 'শেয়ার করুন',
  shareMeasurements: '{name}-এর {category} মাপ',
  shareLanguage: 'শেয়ার ভাষা',
  saveInApp: 'অ্যাপে সেভ করুন',

  about: 'তথ্য',
  version: 'সংস্করণ',
  dataInfo: 'আপনার সমস্ত মাপ এই ডিভাইসে স্থানীয়ভাবে সংরক্ষিত।',
  appLanguage: 'অ্যাপের ভাষা',
  defaultShareLanguage: 'ডিফল্ট শেয়ার ভাষা',

  import: 'আমদানি',
  sharedMeasurement: 'শেয়ার করা মাপ',
  invalidLink: 'অবৈধ লিংক',
  invalidLinkMessage: 'শেয়ার করা মাপ পড়া যায়নি।',
  saveToProfile: 'প্রোফাইলে সংরক্ষণ করুন',
  noProfilesYet: 'এখনো কোনো প্রোফাইল নেই। প্রথমে হোম স্ক্রিন থেকে তৈরি করুন।',
  saveMeasurement: 'মাপ সংরক্ষণ করুন',
  saving: 'সংরক্ষণ হচ্ছে...',
  saved: 'সংরক্ষিত',
  savedMessage: 'নির্বাচিত প্রোফাইলে মাপ সংরক্ষিত হয়েছে।',
  ok: 'ঠিক আছে',

  permissionDenied: 'অনুমতি প্রত্যাখ্যান',
  permissionMessage: 'আপনার ফোন সেটিংসে পরিচিতির অনুমতি দিন।',
  error: 'ত্রুটি',
  enterName: 'অনুগ্রহ করে নাম লিখুন',

  profileNotFound: 'প্রোফাইল পাওয়া যায়নি',
  entryNotFound: 'এন্ট্রি পাওয়া যায়নি',
};

const kn: TranslationStrings = {
  profiles: 'ಪ್ರೊಫೈಲ್',
  settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
  back: 'ಹಿಂದೆ',

  searchPlaceholder: 'ಹೆಸರು ಅಥಾ ಫೋನ್ ನಂಬರ್‌ನಿಂದ ಹುಡುಕಿ',
  noProfilesTitle: 'ಪ್ರೊಫೈಲ್ ಇಲ್ಲ',
  noProfilesSubtitle: 'ಅಳತೆ ಉಳಿಸಲು ಪ್ರೊಫೈಲ್ ರಚಿಸಿ',
  noResults: 'ಫಲಿತಾಂಶ ಇಲ್ಲ',
  noResultsSubtitle: 'ಬೇರೆ ಹೆಸರು ಅಥವಾ ನಂಬರ್ ಪ್ರಯತ್ನಿಸಿ',

  newProfile: 'ಹೊಸ ಪ್ರೊಫೈಲ್',
  createProfile: 'ಪ್ರೊಫೈಲ್ ರಚಿಸಿ',
  creating: 'ರಚಿಸಲಾಗುತ್ತಿದೆ...',
  name: 'ಹೆಸರು',
  namePlaceholder: 'ಉದಾ. ರಾಮ, ಅಮ್ಮ, ನಾನು',
  notesOptional: 'ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)',
  notesPlaceholder: 'ಈ ವ್ಯಕ್ತಿಯ ಬಗ್ಗೆ ಯಾವುದೇ ಟಿಪ್ಪಣಿ',
  pickFromContacts: 'ಸಂಪರ್ಕದಿಂದ ಆಯ್ಕೆಮಾಡಿ',
  linkedTo: 'ಜೋಡಿಸಲಾಗಿದೆ',
  remove: 'ತೆಗೆದುಹಾಕಿ',
  linkToContact: 'ಸಂಪರ್ಕಕ್ಕೆ ಜೋಡಿಸಿ',
  unlinkContact: 'ಸಂಪರ್ಕ ತೆಗೆದುಹಾಕಿ',
  deleteProfile: 'ಪ್ರೊಫೈಲ್ ಅಳಿಸಿ',
  deleteProfileConfirm: '"{name}" ಮತ್ತು ಅವರ ಎಲ್ಲಾ ಅಳತೆ ಅಳಿಸಬೇಕೇ?',
  cancel: 'ರದ್ದುಮಾಡಿ',
  delete: 'ಅಳಿಸಿ',

  noMeasurementsTitle: 'ಇನ್ನೂ ಅಳತೆ ಇಲ್ಲ',
  noMeasurementsSubtitle: 'ಬಟ್ಟೆ, ಕನ್ನಡಕ, ಶೂ ಅಥವಾ ಇತರ ಅಳತೆ ಸೇರಿಸಲು + ಒತ್ತಿ',
  addMeasurement: 'ಅಳತೆ ಸೇರಿಸಿ',
  chooseCategory: 'ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ',
  add: 'ಸೇರಿಸಿ',
  nameOptional: 'ಹೆಸರು (ಐಚ್ಛಿಕ)',
  nameExamplePlaceholder: 'ಉದಾ. "ಫಾರ್ಮಲ್", "ರನ್ನಿಂಗ್"',
  enterValue: '{label} ನಮೂದಿಸಿ',
  deleteMeasurement: 'ಅಳತೆ ಅಳಿಸಿ',
  deleteMeasurementConfirm: 'ನೀವು ಖಚಿತವಾಗಿ ಇದ್ದೀರಾ?',
  noMeasurementsAdded: 'ಅಳತೆ ಸೇರಿಸಿಲ್ಲ',

  catTshirt: 'ಟೀ-ಶರ್ಟ್',
  catShirt: 'ಶರ್ಟ್',
  catSuit: 'ಸೂಟ್ / ಬ್ಲೇಜರ್',
  catPant: 'ಪ್ಯಾಂಟ್',
  catShoes: 'ಶೂ',
  catEyeglasses: 'ಕನ್ನಡಕ',
  catRing: 'ಉಂಗುರ',
  catBangles: 'ಬಳೆಗಳು',
  catBody: 'ದೇಹ',

  fieldSize: 'ಅಳತೆ',
  fieldChest: 'ಎದೆ',
  fieldLength: 'ಉದ್ದ',
  fieldWaist: 'ಸೊಂಟ',
  fieldShoulder: 'ಭುಜ',
  fieldSleeve: 'ತೋಳಿನ ಉದ್ದ',
  fieldJacketLength: 'ಜಾಕೆಟ್ ಉದ್ದ',
  fieldLensWidth: 'ಲೆನ್ಸ್ ಅಗಲ',
  fieldBridge: 'ಬ್ರಿಡ್ಜ್',
  fieldTemple: 'ಟೆಂಪಲ್ ಉದ್ದ',
  fieldLensHeight: 'ಲೆನ್ಸ್ ಎತ್ತರ',
  fieldPD: 'ಕಣ್ಣಿನ ಅಂತರ (PD)',
  fieldSphLeft: 'SPH (ಎಡ)',
  fieldSphRight: 'SPH (ಬಲ)',
  fieldCylLeft: 'CYL (ಎಡ)',
  fieldCylRight: 'CYL (ಬಲ)',
  fieldSizeUS: 'ಅಳತೆ (US)',
  fieldSizeUK: 'ಅಳತೆ (UK)',
  fieldDiameter: 'ಒಳ ವ್ಯಾಸ',
  fieldCircumference: 'ಸುತ್ತಳತೆ',
  fieldHeight: 'ಎತ್ತರ',
  fieldWeight: 'ತೂಕ',
  fieldHip: 'ಸೊಂಟ',
  fieldHips: 'ಸೊಂಟ ಕೆಳಗೆ',
  fieldThigh: 'ತೊಡೆ',
  fieldKnee: 'ಮೊಣಕಾಲು',
  fieldCrotch: 'ಕ್ರಾಚ್',
  fieldInseam: 'ಇನ್‌ಸೀಮ್',
  fieldLegOpening: 'ಕಾಲಿನ ತೆರೆಯುವಿಕೆ',
  fieldNeck: 'ಕುತ್ತಿಗೆ',
  left: 'ಎಡ',
  right: 'ಬಲ',

  share: 'ಹಂಚಿಕೊಳ್ಳಿ',
  shareMeasurements: '{name} ಅವರ {category} ಅಳತೆ',
  shareLanguage: 'ಹಂಚಿಕೆ ಭಾಷೆ',
  saveInApp: 'ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ಉಳಿಸಿ',

  about: 'ಮಾಹಿತಿ',
  version: 'ಆವೃತ್ತಿ',
  dataInfo: 'ನಿಮ್ಮ ಎಲ್ಲಾ ಅಳತೆಗಳು ಈ ಸಾಧನದಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಸಂಗ್ರಹವಾಗಿವೆ.',
  appLanguage: 'ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ',
  defaultShareLanguage: 'ಡೀಫಾಲ್ಟ್ ಹಂಚಿಕೆ ಭಾಷೆ',

  import: 'ಆಮದು',
  sharedMeasurement: 'ಹಂಚಿಕೊಂಡ ಅಳತೆ',
  invalidLink: 'ಅಮಾನ್ಯ ಲಿಂಕ್',
  invalidLinkMessage: 'ಹಂಚಿಕೊಂಡ ಅಳತೆಯನ್ನು ಓದಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  saveToProfile: 'ಪ್ರೊಫೈಲ್‌ಗೆ ಉಳಿಸಿ',
  noProfilesYet: 'ಇನ್ನೂ ಪ್ರೊಫೈಲ್ ಇಲ್ಲ. ಮೊದಲು ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ನಿಂದ ರಚಿಸಿ.',
  saveMeasurement: 'ಅಳತೆ ಉಳಿಸಿ',
  saving: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
  saved: 'ಉಳಿಸಲಾಗಿದೆ',
  savedMessage: 'ಆಯ್ಕೆ ಮಾಡಿದ ಪ್ರೊಫೈಲ್‌ಗೆ ಅಳತೆ ಉಳಿಸಲಾಗಿದೆ.',
  ok: 'ಸರಿ',

  permissionDenied: 'ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ',
  permissionMessage: 'ನಿಮ್ಮ ಫೋನ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಸಂಪರ್ಕ ಅನುಮತಿ ನೀಡಿ.',
  error: 'ದೋಷ',
  enterName: 'ದಯವಿಟ್ಟು ಹೆಸರು ನಮೂದಿಸಿ',

  profileNotFound: 'ಪ್ರೊಫೈಲ್ ಕಂಡುಬಂದಿಲ್ಲ',
  entryNotFound: 'ಎಂಟ್ರಿ ಕಂಡುಬಂದಿಲ್ಲ',
};

const gu: TranslationStrings = {
  profiles: 'પ્રોફાઇલ',
  settings: 'સેટિંગ્સ',
  back: 'પાછળ',

  searchPlaceholder: 'નામ અથવા ફોન નંબરથી શોધો',
  noProfilesTitle: 'કોઈ પ્રોફાઇલ નથી',
  noProfilesSubtitle: 'માપ સાચવવા માટે પ્રોફાઇલ બનાવો',
  noResults: 'કોઈ પરિણામ નથી',
  noResultsSubtitle: 'બીજું નામ અથવા નંબર અજમાવો',

  newProfile: 'નવી પ્રોફાઇલ',
  createProfile: 'પ્રોફાઇલ બનાવો',
  creating: 'બનાવી રહ્યા છે...',
  name: 'નામ',
  namePlaceholder: 'દા.ત. રામ, મા, પોતે',
  notesOptional: 'નોંધ (વૈકલ્પિક)',
  notesPlaceholder: 'આ વ્યક્તિ વિશે કોઈ નોંધ',
  pickFromContacts: 'કોન્ટેક્ટમાંથી પસંદ કરો',
  linkedTo: 'જોડાયેલ',
  remove: 'દૂર કરો',
  linkToContact: 'કોન્ટેક્ટ સાથે જોડો',
  unlinkContact: 'કોન્ટેક્ટ દૂર કરો',
  deleteProfile: 'પ્રોફાઇલ કાઢો',
  deleteProfileConfirm: '"{name}" અને તેમના બધા માપ કાઢવા?',
  cancel: 'રદ કરો',
  delete: 'કાઢો',

  noMeasurementsTitle: 'હજુ કોઈ માપ નથી',
  noMeasurementsSubtitle: 'કપડાં, ચશ્મા, જૂતા અથવા અન્ય માપ ઉમેરવા + દબાવો',
  addMeasurement: 'માપ ઉમેરો',
  chooseCategory: 'શ્રેણી પસંદ કરો',
  add: 'ઉમેરો',
  nameOptional: 'નામ (વૈકલ્પિક)',
  nameExamplePlaceholder: 'દા.ત. "ફોર્મલ", "રનિંગ"',
  enterValue: '{label} દાખલ કરો',
  deleteMeasurement: 'માપ કાઢો',
  deleteMeasurementConfirm: 'શું તમે ખાતરી છો?',
  noMeasurementsAdded: 'કોઈ માપ ઉમેર્યા નથી',

  catTshirt: 'ટી-શર્ટ',
  catShirt: 'શર્ટ',
  catSuit: 'સૂટ / બ્લેઝર',
  catPant: 'પેન્ટ',
  catShoes: 'જૂતા',
  catEyeglasses: 'ચશ્મા',
  catRing: 'વીંટી',
  catBangles: 'બંગડી',
  catBody: 'શરીર',

  fieldSize: 'સાઇઝ',
  fieldChest: 'છાતી',
  fieldLength: 'લંબાઈ',
  fieldWaist: 'કમર',
  fieldShoulder: 'ખભા',
  fieldSleeve: 'બાંયની લંબાઈ',
  fieldJacketLength: 'જેકેટની લંબાઈ',
  fieldLensWidth: 'લેન્સની પહોળાઈ',
  fieldBridge: 'બ્રિજ',
  fieldTemple: 'ટેમ્પલની લંબાઈ',
  fieldLensHeight: 'લેન્સની ઊંચાઈ',
  fieldPD: 'આંખનું અંતર (PD)',
  fieldSphLeft: 'SPH (ડાબું)',
  fieldSphRight: 'SPH (જમણું)',
  fieldCylLeft: 'CYL (ડાબું)',
  fieldCylRight: 'CYL (જમણું)',
  fieldSizeUS: 'સાઇઝ (US)',
  fieldSizeUK: 'સાઇઝ (UK)',
  fieldDiameter: 'અંદરનો વ્યાસ',
  fieldCircumference: 'પરિઘ',
  fieldHeight: 'ઊંચાઈ',
  fieldWeight: 'વજન',
  fieldHip: 'નિતંબ',
  fieldHips: 'નિતંબ',
  fieldThigh: 'જાંઘ',
  fieldKnee: 'ઘૂંટણ',
  fieldCrotch: 'ક્રોચ',
  fieldInseam: 'ઇનસીમ',
  fieldLegOpening: 'પગનું મોઢું',
  fieldNeck: 'ગરદન',
  left: 'ડાબું',
  right: 'જમણું',

  share: 'શેર કરો',
  shareMeasurements: '{name}ના {category}ના માપ',
  shareLanguage: 'શેર ભાષા',
  saveInApp: 'એપમાં સેવ કરો',

  about: 'વિશે',
  version: 'આવૃત્તિ',
  dataInfo: 'તમારા બધા માપ આ ઉપકરણ પર સ્થાનિક રીતે સાચવેલ છે.',
  appLanguage: 'એપની ભાષા',
  defaultShareLanguage: 'ડિફોલ્ટ શેર ભાષા',

  import: 'આયાત',
  sharedMeasurement: 'શેર કરેલ માપ',
  invalidLink: 'અમાન્ય લિંક',
  invalidLinkMessage: 'શેર કરેલ માપ વાંચી શકાયું નહીં.',
  saveToProfile: 'પ્રોફાઇલમાં સેવ કરો',
  noProfilesYet: 'હજુ કોઈ પ્રોફાઇલ નથી. પહેલા હોમ સ્ક્રીનથી બનાવો.',
  saveMeasurement: 'માપ સેવ કરો',
  saving: 'સેવ થઈ રહ્યું છે...',
  saved: 'સેવ થયું',
  savedMessage: 'પસંદ કરેલ પ્રોફાઇલમાં માપ સેવ થયું.',
  ok: 'બરાબર',

  permissionDenied: 'પરવાનગી નકારી',
  permissionMessage: 'તમારી ફોન સેટિંગ્સમાં કોન્ટેક્ટની પરવાનગી આપો.',
  error: 'ભૂલ',
  enterName: 'કૃપા કરીને નામ દાખલ કરો',

  profileNotFound: 'પ્રોફાઇલ મળી નથી',
  entryNotFound: 'એન્ટ્રી મળી નથી',
};

export const translations: Record<LangCode, TranslationStrings> = { en, hi, pa, mr, bn, kn, gu };

const FIELD_KEY_MAP: Record<string, keyof TranslationStrings> = {
  size: 'fieldSize',
  chest: 'fieldChest',
  length: 'fieldLength',
  waist: 'fieldWaist',
  shoulder: 'fieldShoulder',
  sleeve: 'fieldSleeve',
  jacket_length: 'fieldJacketLength',
  lens_width: 'fieldLensWidth',
  bridge: 'fieldBridge',
  temple: 'fieldTemple',
  lens_height: 'fieldLensHeight',
  pd: 'fieldPD',
  sph_left: 'fieldSphLeft',
  sph_right: 'fieldSphRight',
  cyl_left: 'fieldCylLeft',
  cyl_right: 'fieldCylRight',
  size_us: 'fieldSizeUS',
  size_uk: 'fieldSizeUK',
  diameter: 'fieldDiameter',
  circumference: 'fieldCircumference',
  height: 'fieldHeight',
  weight: 'fieldWeight',
  hip: 'fieldHip',
  hips: 'fieldHips',
  thigh: 'fieldThigh',
  knee: 'fieldKnee',
  crotch: 'fieldCrotch',
  inseam: 'fieldInseam',
  leg_opening: 'fieldLegOpening',
  neck: 'fieldNeck',
};

const CATEGORY_SLUG_MAP: Record<string, keyof TranslationStrings> = {
  tshirt: 'catTshirt',
  shirt: 'catShirt',
  suit: 'catSuit',
  pant: 'catPant',
  shoes: 'catShoes',
  eyeglasses: 'catEyeglasses',
  ring: 'catRing',
  bangles: 'catBangles',
  body: 'catBody',
};

export function getFieldLabel(lang: LangCode, fieldKey: string): string | undefined {
  const key = FIELD_KEY_MAP[fieldKey];
  return key ? translations[lang][key] : undefined;
}

export function getCategoryLabel(lang: LangCode, slug: string): string | undefined {
  const key = CATEGORY_SLUG_MAP[slug];
  return key ? translations[lang][key] : undefined;
}
