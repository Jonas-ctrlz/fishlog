
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  expiryDate: string;
  image: string;
}

const DocumentsTab: React.FC = () => {
  const { t } = useLanguage();
  
  // Mock documents data
  const [documents] = useState<Document[]>([
    {
      id: 1,
      name: 'Fishing License',
      type: 'License',
      expiryDate: '2024-12-31',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Angling Club Certificate',
      type: 'Certificate',
      expiryDate: '2025-06-15',
      image: '/placeholder.svg'
    }
  ]);

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-4">No documents added yet</p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t('addDocument')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('documents')}</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {t('addDocument')}
        </Button>
      </div>

      {documents.map((document) => (
        <Card key={document.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{document.name}</CardTitle>
              {isExpiringSoon(document.expiryDate) && (
                <Badge variant="destructive">Expiring Soon</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="w-24 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src={document.image}
                  alt={document.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Type:</span>
                    <span className="ml-2">{document.type}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t('expiryDate')}:</span>
                    <span className="ml-2">{new Date(document.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentsTab;
