
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Map, User, BookOpen, MessageCircle, BookOpen as Book } from 'lucide-react';

const Navigation = () => {
  const { t } = useLanguage();

  const navItems = [
    { name: 'map', path: '/map', icon: Map },
    { name: 'profile', path: '/profile', icon: User },
    { name: 'feed', path: '/feed', icon: BookOpen },
    { name: 'messages', path: '/messages', icon: MessageCircle },
    { name: 'lexicon', path: '/lexicon', icon: Book },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-sm border-t border-border">
      <div className="container">
        <ul className="flex justify-between items-center h-16">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center h-full w-full transition-colors ${
                    isActive
                      ? 'text-fischer-blue font-medium'
                      : 'text-muted-foreground hover:text-fischer-blue'
                  }`
                }
              >
                <item.icon size={24} className="mb-1" />
                <span className="text-xs">{t(item.name)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
