import en from './en';
import te from './te';
import hi from './hi';
import ta from './ta';
import kn from './kn';
import ml from './ml';
import mr from './mr';
import bn from './bn';

export const translations = {
  English: en,
  Telugu: te,
  Hindi: hi,
  Tamil: ta,
  Kannada: kn,
  Malayalam: ml,
  Marathi: mr,
  Bengali: bn,
  // Short code aliases for flexible lookup
  en,
  te,
  hi,
  ta,
  kn,
  ml,
  mr,
  bn,
};

export const LANGUAGES = [
  { id: 'English', code: 'en', name: 'English', nativeName: 'English' },
  { id: 'Telugu', code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { id: 'Hindi', code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { id: 'Tamil', code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { id: 'Kannada', code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { id: 'Malayalam', code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { id: 'Marathi', code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { id: 'Bengali', code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

export default translations;
