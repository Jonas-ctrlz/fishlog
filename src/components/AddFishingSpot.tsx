
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface AddFishingSpotProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (spot: any) => void;
}

const AddFishingSpot = ({ isOpen, onClose, onSave }: AddFishingSpotProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    depth: '',
    quality: '',
    type: '',
    fish: [] as string[],
    rating: 3,
    isFavorite: false
  });
  const [newFish, setNewFish] = useState('');

  const handleSave = () => {
    if (!formData.name || !formData.location || !formData.depth || !formData.quality || !formData.type) {
      return;
    }

    onSave(formData);
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      depth: '',
      quality: '',
      type: '',
      fish: [],
      rating: 3,
      isFavorite: false
    });
    setNewFish('');
    onClose();
  };

  const addFish = () => {
    if (newFish.trim() && !formData.fish.includes(newFish.trim())) {
      setFormData(prev => ({
        ...prev,
        fish: [...prev.fish, newFish.trim()]
      }));
      setNewFish('');
    }
  };

  const removeFish = (fishToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      fish: prev.fish.filter(fish => fish !== fishToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFish();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Fishing Spot</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Spot Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter spot name..."
            />
          </div>

          <div>
            <Label htmlFor="location">{t('location')} *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter location..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="depth">{t('depth')} *</Label>
              <Input
                id="depth"
                value={formData.depth}
                onChange={(e) => setFormData(prev => ({ ...prev, depth: e.target.value }))}
                placeholder="e.g. 2-5m"
              />
            </div>
            <div>
              <Label htmlFor="quality">{t('quality')} *</Label>
              <Select value={formData.quality} onValueChange={(value) => setFormData(prev => ({ ...prev, quality: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="type">Water Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select water type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="river">River</SelectItem>
                <SelectItem value="lake">Lake</SelectItem>
                <SelectItem value="stream">Stream</SelectItem>
                <SelectItem value="pond">Pond</SelectItem>
                <SelectItem value="canal">Canal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="rating">{t('rating')}</Label>
            <Select value={formData.rating.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, rating: Number(value) }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fish">{t('fishSpecies')}</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newFish}
                onChange={(e) => setNewFish(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add fish species..."
              />
              <Button type="button" onClick={addFish} size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.fish.map((fish) => (
                <Badge key={fish} variant="outline" className="flex items-center gap-1">
                  {fish}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFish(fish)}
                  />
                </Badge>
              ))}
            </div>
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

export default AddFishingSpot;
