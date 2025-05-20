
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant={language === 'en' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setLanguage('en')}
      >
        {t('english')}
      </Button>
      <Button 
        variant={language === 'de' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setLanguage('de')}
      >
        {t('german')}
      </Button>
    </div>
  );
};

export default LanguageSelector;
