
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CalendarIcon, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddJournalEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: any) => void;
}

const AddJournalEntry: React.FC<AddJournalEntryProps> = ({ isOpen, onClose, onSave }) => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState('');
  const [fishCaught, setFishCaught] = useState('');
  const [leadsAndBait, setLeadsAndBait] = useState('');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handleSave = () => {
    const entry = {
      id: Date.now(),
      date: date.toISOString().split('T')[0],
      location,
      fishCaught: fishCaught.split(',').map(f => f.trim()).filter(f => f),
      leadsAndBait,
      notes,
      image: photo || '/placeholder.svg'
    };
    onSave(entry);
    
    // Reset form
    setDate(new Date());
    setLocation('');
    setFishCaught('');
    setLeadsAndBait('');
    setNotes('');
    setPhoto(null);
    
    onClose();
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('addJournalEntry')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="photo">{t('photo')}</Label>
            <div className="mt-2">
              {photo ? (
                <div className="relative">
                  <img src={photo} alt="Preview" className="w-full h-32 object-cover rounded-md" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setPhoto(null)}
                  >
                    Remove Photo
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-4 text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <span className="text-sm text-muted-foreground">{t('uploadPhoto')}</span>
                  </Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>{t('dateTime')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>{t('selectDate')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="location">{t('fishingSpot')}</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="fishCaught">{t('fishCaught')} (comma separated)</Label>
            <Input
              id="fishCaught"
              value={fishCaught}
              onChange={(e) => setFishCaught(e.target.value)}
              placeholder="Rainbow Trout, Pike"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="leadsAndBait">{t('leadsAndBait')}</Label>
            <Input
              id="leadsAndBait"
              value={leadsAndBait}
              onChange={(e) => setLeadsAndBait(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="notes">{t('notes')}</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              {t('save')}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t('cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddJournalEntry;
