
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface JournalEntryProps {
  entry: {
    id: number;
    date: string;
    location: string;
    fishCaught: string[];
    image: string;
    notes: string;
  };
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry }) => {
  const { t } = useLanguage();
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="font-medium">{formatDate(entry.date)}</div>
          <div className="text-sm text-muted-foreground">{entry.location}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-muted rounded-md overflow-hidden">
            <img
              src={entry.image}
              alt="Fish catch"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <div className="text-sm font-medium mb-1">{t('fishCaught')}:</div>
              <div className="flex flex-wrap gap-1">
                {entry.fishCaught.map((fish) => (
                  <Badge key={fish} variant="outline">{fish}</Badge>
                ))}
              </div>
            </div>
            <p className="text-sm">{entry.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalEntry;
