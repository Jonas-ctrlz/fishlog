
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Filter, Star, Plus, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import HamburgMap from '@/components/HamburgMap';
import AddFishingSpot from '@/components/AddFishingSpot';

const MapPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [isAddSpotOpen, setIsAddSpotOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  
  const [fishingSpots, setFishingSpots] = useState([
    {
      id: 1,
      name: 'Elbe River Hamburg',
      location: 'Hamburg, Germany',
      rating: 4.3,
      depth: '3-8m',
      quality: 'Good',
      fish: ['Pike', 'Perch', 'Zander'],
      isFavorite: false,
      reviews: [
        { id: 1, user: 'Klaus M.', rating: 4, comment: 'Great spot in the city center. Good for pike fishing.' },
        { id: 2, user: 'Sandra L.', rating: 5, comment: 'Caught a nice zander here last week!' }
      ],
      type: 'river',
      addedBy: 'System'
    },
    {
      id: 2,
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
      ],
      type: 'river',
      addedBy: 'System'
    },
    {
      id: 3,
      name: 'Lake Victoria',
      location: 'Berlin',
      rating: 4.2,
      depth: '3-10m',
      quality: 'Excellent',
      fish: ['Carp', 'Bass', 'Catfish'],
      isFavorite: false,
      reviews: [
        { id: 3, user: 'Tom B.', rating: 4, comment: 'Perfect for carp fishing. Very clean water.' }
      ],
      type: 'lake',
      addedBy: 'System'
    },
    {
      id: 4,
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
      ],
      type: 'stream',
      addedBy: 'System'
    }
  ]);

  const handleAddSpot = (newSpot: any) => {
    const spotWithId = {
      ...newSpot,
      id: fishingSpots.length + 1,
      reviews: [],
      addedBy: 'User'
    };
    setFishingSpots([spotWithId, ...fishingSpots]);
  };

  const sortedSpots = [...fishingSpots].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'location':
        return a.location.localeCompare(b.location);
      case 'depth':
        return a.depth.localeCompare(b.depth);
      case 'quality':
        const qualityOrder = { 'Excellent': 3, 'Good': 2, 'Fair': 1, 'Poor': 0 };
        return (qualityOrder[b.quality as keyof typeof qualityOrder] || 0) - (qualityOrder[a.quality as keyof typeof qualityOrder] || 0);
      default:
        return 0;
    }
  });

  const filteredSpots = sortedSpots.filter(spot =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.fish.some(fish => fish.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px]">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="location">Location</SelectItem>
            <SelectItem value="depth">Depth</SelectItem>
            <SelectItem value="quality">Quality</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setIsAddSpotOpen(true)} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <HamburgMap />
      
      <Tabs defaultValue="spots">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="spots">{t('fishingSpots')}</TabsTrigger>
          <TabsTrigger value="favorites">{t('favorites')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spots" className="space-y-4 pt-4">
          {filteredSpots.map(spot => (
            <SpotCard key={spot.id} spot={spot} onSelect={setSelectedSpot} />
          ))}
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4 pt-4">
          {filteredSpots.filter(s => s.isFavorite).map(spot => (
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

      {/* Add Fishing Spot Dialog */}
      <AddFishingSpot 
        isOpen={isAddSpotOpen}
        onClose={() => setIsAddSpotOpen(false)}
        onSave={handleAddSpot}
      />
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
            <CardTitle className="flex items-center gap-2">
              {spot.name}
              {spot.addedBy === 'User' && <Badge variant="secondary" className="text-xs">Custom</Badge>}
            </CardTitle>
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
          {spot.reviews.length > 0 ? (
            spot.reviews.map((review: any) => (
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
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
