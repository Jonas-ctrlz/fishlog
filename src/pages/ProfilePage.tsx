
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, User, PenTool as Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import JournalEntry from '@/components/JournalEntry';
import LanguageSelector from '@/components/LanguageSelector';
import AddJournalEntry from '@/components/AddJournalEntry';
import StatsTab from '@/components/StatsTab';
import DocumentsTab from '@/components/DocumentsTab';

const ProfilePage = () => {
  const { t } = useLanguage();
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  
  // Mock journal entries with state
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: '2023-06-12',
      location: 'Lake Victoria',
      fishCaught: ['Rainbow Trout', 'Pike'],
      image: '/placeholder.svg',
      notes: 'Great day fishing! Caught 2 trouts and a pike.',
      leadsAndBait: 'Spinner, Worms'
    },
    {
      id: 2,
      date: '2023-05-28',
      location: 'River Rhine',
      fishCaught: ['Carp', 'Perch'],
      image: '/placeholder.svg',
      notes: 'Water was clear, weather was perfect. Caught several fish.',
      leadsAndBait: 'Bottom rig, Corn'
    }
  ]);

  const handleAddEntry = (newEntry: any) => {
    setJournalEntries([newEntry, ...journalEntries]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t('settings')}</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-medium mb-3">{t('language')}</h3>
                <LanguageSelector />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Max Fischer</h2>
          <p className="text-muted-foreground">Cologne, Germany</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="font-bold">{journalEntries.length}</p>
            <p className="text-sm text-muted-foreground">{t('journal')} {t('entries')}</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{journalEntries.reduce((total, entry) => total + entry.fishCaught.length, 0)}</p>
            <p className="text-sm text-muted-foreground">{t('fishCaught')}</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="journal">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="journal">{t('journal')}</TabsTrigger>
          <TabsTrigger value="stats">{t('stats')}</TabsTrigger>
          <TabsTrigger value="documents">{t('documents')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="journal" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{t('journal')} {t('entries')}</h3>
            <Button size="sm" onClick={() => setIsAddEntryOpen(true)}>
              <Pen className="h-4 w-4 mr-2" />
              {t('addEntry')}
            </Button>
          </div>
          
          {journalEntries.map(entry => (
            <JournalEntry key={entry.id} entry={entry} />
          ))}
        </TabsContent>
        
        <TabsContent value="stats" className="pt-4">
          <StatsTab journalEntries={journalEntries} />
        </TabsContent>

        <TabsContent value="documents" className="pt-4">
          <DocumentsTab />
        </TabsContent>
      </Tabs>

      <AddJournalEntry 
        isOpen={isAddEntryOpen}
        onClose={() => setIsAddEntryOpen(false)}
        onSave={handleAddEntry}
      />
    </div>
  );
};

export default ProfilePage;
