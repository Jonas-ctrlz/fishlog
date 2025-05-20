
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LexiconPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Mock fish data
  const fishData = [
    {
      id: 1,
      name: 'Rainbow Trout',
      scientificName: 'Oncorhynchus mykiss',
      habitat: 'Rivers, Lakes',
      fishingMethod: 'Fly fishing, Lure fishing',
      image: '/placeholder.svg',
      description: 'A species of salmonid native to cold-water tributaries of the Pacific Ocean.'
    },
    {
      id: 2,
      name: 'Pike',
      scientificName: 'Esox lucius',
      habitat: 'Lakes, Slow-moving rivers',
      fishingMethod: 'Lure fishing, Live bait',
      image: '/placeholder.svg',
      description: 'Ambush predators that often lie in wait for prey among aquatic plants.'
    },
    {
      id: 3,
      name: 'Carp',
      scientificName: 'Cyprinus carpio',
      habitat: 'Lakes, Rivers, Ponds',
      fishingMethod: 'Bottom fishing, Float fishing',
      image: '/placeholder.svg',
      description: 'Popular for sport fishing, known for its fighting ability when hooked.'
    }
  ];
  
  // Mock equipment data
  const equipmentData = [
    {
      id: 1,
      name: 'Fly Rod',
      category: 'Rods',
      bestFor: 'Trout, Salmon',
      image: '/placeholder.svg',
      description: 'Specialized for fly fishing, typically lightweight with a unique casting technique.'
    },
    {
      id: 2,
      name: 'Spinning Reel',
      category: 'Reels',
      bestFor: 'General freshwater fishing',
      image: '/placeholder.svg',
      description: 'Versatile reel that's easy to use and good for beginners.'
    },
    {
      id: 3,
      name: 'Fishing Hook Assortment',
      category: 'Tackle',
      bestFor: 'Various fish species',
      image: '/placeholder.svg',
      description: 'Different sizes and styles for various fishing methods and target species.'
    }
  ];

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('lexicon')}</h2>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`${t('search')}...`}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Freshwater</DropdownMenuItem>
            <DropdownMenuItem>Saltwater</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="icon" onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        </Button>
      </div>
      
      <Tabs defaultValue="fish">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="fish">{t('fishSpecies')}</TabsTrigger>
          <TabsTrigger value="equipment">{t('equipment')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fish" className="space-y-4 pt-4">
          {fishData.map(fish => (
            <Card key={fish.id}>
              <CardHeader className="pb-2">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                    <img
                      src={fish.image}
                      alt={fish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{fish.name}</h3>
                    <p className="text-sm italic text-muted-foreground">{fish.scientificName}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <div className="text-sm font-medium">Habitat:</div>
                    <div className="text-sm">{fish.habitat}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Fishing Method:</div>
                    <div className="text-sm">{fish.fishingMethod}</div>
                  </div>
                </div>
                <p className="text-sm">{fish.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="equipment" className="space-y-4 pt-4">
          {equipmentData.map(equipment => (
            <Card key={equipment.id}>
              <CardHeader className="pb-2">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                    <img
                      src={equipment.image}
                      alt={equipment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{equipment.name}</h3>
                    <p className="text-sm text-muted-foreground">{equipment.category}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <div className="text-sm font-medium">Best For:</div>
                  <div className="text-sm">{equipment.bestFor}</div>
                </div>
                <p className="text-sm">{equipment.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LexiconPage;
