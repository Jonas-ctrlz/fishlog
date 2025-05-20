
import React from 'react';
import Navigation from './Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-background water-pattern">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-bold text-2xl text-fischer-blue">
            {t('appName')}
          </h1>
          <div className="flex items-center gap-2">
            {/* Add header actions here if needed */}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-4">
        {children}
      </main>
      
      <Navigation />
    </div>
  );
};

export default Layout;
