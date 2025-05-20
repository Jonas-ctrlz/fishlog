
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, MapPin, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MapPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  const mockSpots = [
    {
      id: 1,
      name: 'River Rhine North',
      location: 'Cologne',
      rating: 4.5,
      depth: '2-5m',
      quality: 'Good',
      fish: ['Trout', 'Pike', 'Perch'],
      isFavorite: true
    },
    {
      id: 2,
      name: 'Lake Victoria',
      location: 'Berlin',
      rating: 4.2,
      depth: '3-10m',
      quality: 'Excellent',
      fish: ['Carp', 'Bass', 'Catfish'],
      isFavorite: false
    },
    {
      id: 3,
      name: 'Mountain Stream',
      location: 'Bavaria',
      rating: 4.8,
      depth: '1-2m',
      quality: 'Excellent',
      fish: ['Brown Trout', 'Grayling'],
      isFavorite: true
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
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="spots">{t('fishingSpots')}</TabsTrigger>
          <TabsTrigger value="favorites">{t('favorites')}</TabsTrigger>
          <TabsTrigger value="reviews">{t('reviews')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spots" className="space-y-4 pt-4">
          {mockSpots.map(spot => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4 pt-4">
          {mockSpots.filter(s => s.isFavorite).map(spot => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </TabsContent>
        
        <TabsContent value="reviews" className="pt-4">
          <p className="text-center text-muted-foreground py-8">
            {t('comingSoon')}
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SpotCard = ({ spot }: { spot: any }) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{spot.name}</CardTitle>
            <CardDescription>{spot.location}</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
            <svg
              className="h-4 w-4 text-yellow-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
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

export default MapPage;
