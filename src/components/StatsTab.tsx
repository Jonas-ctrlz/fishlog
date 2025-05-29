
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatsTabProps {
  journalEntries: any[];
}

const StatsTab: React.FC<StatsTabProps> = ({ journalEntries }) => {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState<'location' | 'date'>('location');
  const [filterByFish, setFilterByFish] = useState<string>('all');

  // Get all unique fish types
  const allFishTypes = Array.from(
    new Set(journalEntries.flatMap(entry => entry.fishCaught))
  );

  // Filter entries by selected fish
  const filteredEntries = filterByFish === 'all' 
    ? journalEntries 
    : journalEntries.filter(entry => entry.fishCaught.includes(filterByFish));

  // Group entries by location
  const statsByLocation = filteredEntries.reduce((acc, entry) => {
    const location = entry.location;
    if (!acc[location]) {
      acc[location] = {
        location,
        entries: [],
        totalFish: 0,
        fishTypes: new Set()
      };
    }
    acc[location].entries.push(entry);
    acc[location].totalFish += entry.fishCaught.length;
    entry.fishCaught.forEach((fish: string) => acc[location].fishTypes.add(fish));
    return acc;
  }, {} as Record<string, any>);

  const sortedStats = Object.values(statsByLocation).sort((a: any, b: any) => {
    if (sortBy === 'location') {
      return a.location.localeCompare(b.location);
    }
    // Sort by most recent date
    const aLatest = Math.max(...a.entries.map((e: any) => new Date(e.date).getTime()));
    const bLatest = Math.max(...b.entries.map((e: any) => new Date(e.date).getTime()));
    return bLatest - aLatest;
  });

  const toggleSort = () => {
    setSortBy(sortBy === 'location' ? 'date' : 'location');
  };

  if (journalEntries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t('noEntriesYet')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('stats')}</h3>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {filterByFish === 'all' ? t('allFish') : filterByFish}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterByFish('all')}>
                {t('allFish')}
              </DropdownMenuItem>
              {allFishTypes.map((fish) => (
                <DropdownMenuItem key={fish} onClick={() => setFilterByFish(fish)}>
                  {fish}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={toggleSort}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            {sortBy === 'location' ? t('location') : t('date')}
          </Button>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No entries found for {filterByFish}
          </p>
        </div>
      ) : (
        sortedStats.map((stat: any) => (
          <Card key={stat.location}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{stat.location}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Total Visits:</span>
                    <span className="ml-2">{stat.entries.length}</span>
                  </div>
                  <div>
                    <span className="font-medium">Total Fish:</span>
                    <span className="ml-2">{stat.totalFish}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">{t('fishSpecies')}:</div>
                  <div className="flex flex-wrap gap-1">
                    {Array.from(stat.fishTypes).map((fish: any) => (
                      <Badge key={fish} variant="outline">{fish}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Recent Visits:</div>
                  <div className="space-y-1">
                    {stat.entries
                      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 3)
                      .map((entry: any) => (
                        <div key={entry.id} className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()} - {entry.fishCaught.join(', ')}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default StatsTab;
