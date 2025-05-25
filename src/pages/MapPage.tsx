
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, MapPin, Filter, X, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const MapPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  
  const mockSpots = [
    {
      id: 1,
      name: 'River Rhine North',
      location: 'Cologne',
      rating: 4.5,
      depth: '2-5m',
      quality: 'Good',
      fish: ['Trout', 'Pike', 'Perch'],
      isFavorite: true,
      reviews: [
        { id: 1, user: 'Max F.', rating: 5, comment: 'Great spot for trout fishing!' },
        { id: 2, user: 'Anna K.', rating: 4, comment: 'Good water quality, caught several pike.' }
      ]
    },
    {
      id: 2,
      name: 'Lake Victoria',
      location: 'Berlin',
      rating: 4.2,
      depth: '3-10m',
      quality: 'Excellent',
      fish: ['Carp', 'Bass', 'Catfish'],
      isFavorite: false,
      reviews: [
        { id: 3, user: 'Tom B.', rating: 4, comment: 'Perfect for carp fishing. Very clean water.' }
      ]
    },
    {
      id: 3,
      name: 'Mountain Stream',
      location: 'Bavaria',
      rating: 4.8,
      depth: '1-2m',
      quality: 'Excellent',
      fish: ['Brown Trout', 'Grayling'],
      isFavorite: true,
      reviews: [
        { id: 4, user: 'Lisa M.', rating: 5, comment: 'Beautiful scenery and great fishing!' },
        { id: 5, user: 'Peter S.', rating: 5, comment: 'Best trout spot in Bavaria!' }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`${t('search')} ${t('fishingSpots')}...`}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-[300px] bg-fischer-lightGray rounded-lg flex items-center justify-center border">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-fischer-blue mx-auto mb-2 animate-water-wave" />
          <p>{t('map')} {t('placeholder')}</p>
        </div>
      </div>
      
      <Tabs defaultValue="spots">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="spots">{t('fishingSpots')}</TabsTrigger>
          <TabsTrigger value="favorites">{t('favorites')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spots" className="space-y-4 pt-4">
          {mockSpots.map(spot => (
            <SpotCard key={spot.id} spot={spot} onSelect={setSelectedSpot} />
          ))}
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4 pt-4">
          {mockSpots.filter(s => s.isFavorite).map(spot => (
            <SpotCard key={spot.id} spot={spot} onSelect={setSelectedSpot} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Spot Detail Dialog */}
      <Dialog open={!!selectedSpot} onOpenChange={() => setSelectedSpot(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedSpot?.name}</DialogTitle>
          </DialogHeader>
          {selectedSpot && <SpotDetails spot={selectedSpot} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SpotCard = ({ spot, onSelect }: { spot: any; onSelect: (spot: any) => void }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelect(spot)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{spot.name}</CardTitle>
            <CardDescription>{spot.location}</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{spot.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t('waterDepth')}:</span>
              <span className="text-sm">{spot.depth}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t('waterQuality')}:</span>
              <span className="text-sm">{spot.quality}</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">{t('fishSpecies')}:</div>
            <div className="flex flex-wrap gap-1">
              {spot.fish.map((fish: string) => (
                <Badge key={fish} variant="outline">{fish}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SpotDetails = ({ spot }: { spot: any }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium">{t('location')}</div>
          <div className="text-sm">{spot.location}</div>
        </div>
        <div>
          <div className="text-sm font-medium">{t('rating')}</div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm">{spot.rating}</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium">{t('depth')}</div>
          <div className="text-sm">{spot.depth}</div>
        </div>
        <div>
          <div className="text-sm font-medium">{t('quality')}</div>
          <div className="text-sm">{spot.quality}</div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">{t('fishSpecies')}</div>
        <div className="flex flex-wrap gap-1">
          {spot.fish.map((fish: string) => (
            <Badge key={fish} variant="outline">{fish}</Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">{t('reviews')}</div>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {spot.reviews.map((review: any) => (
            <div key={review.id} className="border rounded p-2">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium">{review.user}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs">{review.rating}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
