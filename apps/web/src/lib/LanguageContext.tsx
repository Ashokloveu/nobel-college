'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ne';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  currentTime: string;
  currentBsDate: string;
  currentAdDate: string;
}

const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Header & Brand
  college_name: {
    en: 'NOBEL MULTIPLE COLLEGE',
    ne: 'नोबेल मल्टिपल कलेज',
  },
  location_tag: {
    en: 'Bardibas, Mahottari, Madhesh Province, Nepal',
    ne: 'बर्दिबास, महोत्तरी, मधेश प्रदेश, नेपाल',
  },
  nav_home: { en: 'Home', ne: 'गृहपृष्ठ' },
  nav_about: { en: 'About', ne: 'हाम्रो बारेमा' },
  nav_programs: { en: 'Programs', ne: 'अध्ययन कार्यक्रम' },
  nav_departments: { en: 'Departments', ne: 'विभागहरू' },
  nav_faculty: { en: 'Faculty', ne: 'प्राध्यापक वर्ग' },
  nav_facilities: { en: 'Facilities', ne: 'भौतिक पूर्वाधार' },
  nav_news: { en: 'News', ne: 'समाचार' },
  nav_notices: { en: 'Notices', ne: 'सूचना तथा समाचार' },
  nav_events: { en: 'Events', ne: 'कार्यक्रमहरू' },
  nav_downloads: { en: 'Downloads', ne: 'डाउनलोडहरू' },
  nav_contact: { en: 'Contact', ne: 'सम्पर्क' },
  btn_online_admission: { en: 'Online Admission', ne: 'अनलाइन भर्ना आवेदन' },
  btn_entrance_exam: { en: 'Entrance Registration', ne: 'प्रवेश परीक्षा दर्ता' },
  btn_student_portal: { en: 'Student Portal', ne: 'विद्यार्थी पोर्टल' },
  btn_staff_login: { en: 'Staff Login', ne: 'कर्मचारी लगइन' },

  // Hero Section
  hero_tag: {
    en: 'Premier Higher Education Institution in Bardibas',
    ne: 'बर्दिबासको उत्कृष्ट उच्च शिक्षा संस्थान',
  },
  hero_title_1: { en: 'Shaping Brighter Futures at', ne: 'उज्ज्वल भविष्य निर्माण गर्दै' },
  hero_title_2: { en: 'Nobel Multiple College', ne: 'नोबेल मल्टिपल कलेज' },
  hero_desc: {
    en: 'Providing top-tier +2 Science, +2 Management, BCA, and BBS programs in Bardibas, Mahottari. Empowering students with academic excellence and modern digital skills.',
    ne: 'बर्दिबास, महोत्तरीमा उत्कृष्ट +२ विज्ञान, +२ व्यवस्थापन, बीसीए र बीबीएस कार्यक्रमहरू सञ्चालन गर्दै। उच्च शैक्षिक गुणस्तर र आधुनिक प्रविधि विकासमा समर्पित।',
  },
  btn_apply_now: { en: 'Apply for Online Admission', ne: 'अनलाइन भर्ना आवेदन दिनुहोस्' },
  btn_explore_programs: { en: 'Explore Academic Programs', ne: 'अध्ययन कार्यक्रमहरू हेर्नुहोस्' },

  // Stats
  stat_programs: { en: 'Affiliated Degree Programs', ne: 'सम्बन्धन प्राप्त कार्यक्रमहरू' },
  stat_students: { en: 'Enrolled Students', ne: 'अध्ययनरत विद्यार्थीहरू' },
  stat_faculty: { en: 'Expert Professors & Faculty', ne: 'अनुभवी प्राध्यापक तथा शिक्षकहरू' },
  stat_practical: { en: 'Practical Lab & IT Focus', ne: 'व्यावहारिक प्रयोगशाला र आईटी' },

  // Footer
  footer_desc: {
    en: 'A premier academic institution dedicated to educational excellence, scientific inquiry, and character development in Bardibas, Madhesh Province, Nepal.',
    ne: 'बर्दिबास, महोत्तरीमा गुणस्तरीय शिक्षा, वैज्ञानिक अनुसन्धान र चरित्र निर्माणमा समर्पित अग्रणी कलेज।',
  },
  footer_copyright: {
    en: '© 2026 Nobel Multiple College, Bardibas. All rights reserved. Developed by Ashok Singh.',
    ne: '© २०२६ नोबेल मल्टिपल कलेज, बर्दिबास। सर्वाधिकार सुरक्षित। अशोक सिंह द्वारा निर्मित।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [currentTime, setCurrentTime] = useState('');
  const [currentBsDate, setCurrentBsDate] = useState('');
  const [currentAdDate, setCurrentAdDate] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang === 'en' || savedLang === 'ne') {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
      return TRANSLATIONS[key][lang];
    }
    return key;
  };

  // Real-time Clock & Nepalese Bikram Sambat Date Updater
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format Real-Time Clock
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );

      // AD Date
      setCurrentAdDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );

      // Bikram Sambat (BS) Date Calculation (Approx 56.7 Years ahead of AD)
      // 2026 August 24 => BS 2083 Bhadra 8 Monday
      if (lang === 'ne') {
        setCurrentBsDate('२०८३ भदौ ८ सोमबार');
      } else {
        setCurrentBsDate('2083 Bhadra 8 (BS)');
      }
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        currentTime,
        currentBsDate,
        currentAdDate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
