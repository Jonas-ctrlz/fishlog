
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, User, PenTool as Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JournalEntry from '@/components/JournalEntry';

const ProfilePage = () => {
  const { t } = useLanguage();
  
  // Mock journal entries
  const journalEntries = [
    {
      id: 1,
      date: '2023-06-12',
      location: 'Lake Victoria',
      fishCaught: ['Rainbow Trout', 'Pike'],
      image: '/placeholder.svg',
      notes: 'Great day fishing! Caught 2 trouts and a pike.'
    },
    {
      id: 2,
      date: '2023-05-28',
      location: 'River Rhine',
      fishCaught: ['Carp', 'Perch'],
      image: '/placeholder.svg',
      notes: 'Water was clear, weather was perfect. Caught several fish.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
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
            <p className="font-bold">24</p>
            <p className="text-sm text-muted-foreground">{t('friends')}</p>
          </div>
          <div className="text-center">
            <p className="font-bold">18</p>
            <p className="text-sm text-muted-foreground">{t('journal')} {t('entries')}</p>
          </div>
          <div className="text-center">
            <p className="font-bold">42</p>
            <p className="text-sm text-muted-foreground">{t('favorites')}</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="journal">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="journal">{t('journal')}</TabsTrigger>
          <TabsTrigger value="friends">{t('friends')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="journal" className="space-y-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{t('journal')} {t('entries')}</h3>
            <Button size="sm">
              <Pen className="h-4 w-4 mr-2" />
              {t('addEntry')}
            </Button>
          </div>
          
          {journalEntries.map(entry => (
            <JournalEntry key={entry.id} entry={entry} />
          ))}
        </TabsContent>
        
        <TabsContent value="friends" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('friends')}</CardTitle>
              <CardDescription>Your fishing buddies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                {t('comingSoon')}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
