import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'de';

type Translations = {
  [key: string]: {
    en: string;
    de: string;
  };
};

// Define all translations here
const translations: Translations = {
  appName: {
    en: 'FishLog',
    de: 'FishLog',
  },
  map: {
    en: 'Map',
    de: 'Karte',
  },
  profile: {
    en: 'Profile',
    de: 'Profil',
  },
  feed: {
    en: 'Feed',
    de: 'Feed',
  },
  messages: {
    en: 'Messages',
    de: 'Nachrichten',
  },
  lexicon: {
    en: 'Lexicon',
    de: 'Lexikon',
  },
  settings: {
    en: 'Settings',
    de: 'Einstellungen',
  },
  journal: {
    en: 'Journal',
    de: 'Journal',
  },
  search: {
    en: 'Search',
    de: 'Suchen',
  },
  fishingSpots: {
    en: 'Fishing Spots',
    de: 'Angelplätze',
  },
  favorites: {
    en: 'Favorites',
    de: 'Favoriten',
  },
  reviews: {
    en: 'Reviews',
    de: 'Bewertungen',
  },
  waterDepth: {
    en: 'Water Depth',
    de: 'Wassertiefe',
  },
  waterQuality: {
    en: 'Water Quality',
    de: 'Wasserqualität',
  },
  fishSpecies: {
    en: 'Fish Species',
    de: 'Fischarten',
  },
  addEntry: {
    en: 'Add Entry',
    de: 'Eintrag hinzufügen',
  },
  friends: {
    en: 'Friends',
    de: 'Freunde',
  },
  equipment: {
    en: 'Equipment',
    de: 'Ausrüstung',
  },
  filterBy: {
    en: 'Filter By',
    de: 'Filtern nach',
  },
  sortBy: {
    en: 'Sort By',
    de: 'Sortieren nach',
  },
  changeLanguage: {
    en: 'Change Language',
    de: 'Sprache ändern',
  },
  english: {
    en: 'English',
    de: 'Englisch',
  },
  german: {
    en: 'German',
    de: 'Deutsch',
  },
  camera: {
    en: 'Camera',
    de: 'Kamera',
  },
  fishRecognition: {
    en: 'Fish Recognition',
    de: 'Fischerkennung',
  },
  recognizing: {
    en: 'Recognizing...',
    de: 'Erkennung läuft...',
  },
  takePicture: {
    en: 'Take Picture',
    de: 'Foto aufnehmen',
  },
  entries: {
    en: 'Entries',
    de: 'Einträge',
  },
  comingSoon: {
    en: 'Coming Soon',
    de: 'Demnächst verfügbar',
  },
  placeholder: {
    en: 'Coming Soon',
    de: 'Demnächst verfügbar',
  },
  close: {
    en: 'Close',
    de: 'Schließen',
  },
  rating: {
    en: 'Rating',
    de: 'Bewertung',
  },
  location: {
    en: 'Location',
    de: 'Standort',
  },
  depth: {
    en: 'Depth',
    de: 'Tiefe',
  },
  quality: {
    en: 'Quality',
    de: 'Qualität',
  },
  language: {
    en: 'Language',
    de: 'Sprache',
  },
  photo: {
    en: 'Photo',
    de: 'Foto',
  },
  dateTime: {
    en: 'Date & Time',
    de: 'Datum & Zeit',
  },
  fishingSpot: {
    en: 'Fishing Spot',
    de: 'Angelplatz',
  },
  leadsAndBait: {
    en: 'Leads & Bait',
    de: 'Blei & Köder',
  },
  notes: {
    en: 'Notes',
    de: 'Notizen',
  },
  save: {
    en: 'Save',
    de: 'Speichern',
  },
  cancel: {
    en: 'Cancel',
    de: 'Abbrechen',
  },
  stats: {
    en: 'Stats',
    de: 'Statistiken',
  },
  fishCaught: {
    en: 'Fish Caught',
    de: 'Gefangene Fische',
  },
  date: {
    en: 'Date',
    de: 'Datum',
  },
  uploadPhoto: {
    en: 'Upload Photo',
    de: 'Foto hochladen',
  },
  selectDate: {
    en: 'Select Date',
    de: 'Datum auswählen',
  },
  addJournalEntry: {
    en: 'Add Journal Entry',
    de: 'Journal-Eintrag hinzufügen',
  },
  noEntriesYet: {
    en: 'No entries yet',
    de: 'Noch keine Einträge',
  },
  documents: {
    en: 'Documents',
    de: 'Dokumente',
  },
  fishingLicense: {
    en: 'Fishing License',
    de: 'Angelschein',
  },
  clubCertificate: {
    en: 'Club Certificate',
    de: 'Vereinszertifikat',
  },
  expiryDate: {
    en: 'Expiry Date',
    de: 'Ablaufdatum',
  },
  addDocument: {
    en: 'Add Document',
    de: 'Dokument hinzufügen',
  },
  filterByFish: {
    en: 'Filter by Fish',
    de: 'Nach Fisch filtern',
  },
  allFish: {
    en: 'All Fish',
    de: 'Alle Fische',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
