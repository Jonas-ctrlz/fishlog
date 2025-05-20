
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { User } from 'lucide-react';

const FeedPage = () => {
  const { t } = useLanguage();
  
  // Mock feed posts
  const feedPosts = [
    {
      id: 1,
      author: 'Anna Schmidt',
      authorAvatar: '/placeholder.svg',
      date: '2h ago',
      content: 'Just caught a huge pike at River Rhine! What a day!',
      image: '/placeholder.svg',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: 'Thomas Weber',
      authorAvatar: '/placeholder.svg',
      date: '6h ago',
      content: 'Check out this new fishing rod I just got. Perfect for trout fishing!',
      image: '/placeholder.svg',
      likes: 42,
      comments: 15
    },
    {
      id: 3,
      author: 'Marie Fischer',
      authorAvatar: '/placeholder.svg',
      date: 'Yesterday',
      content: 'Beautiful sunrise at Lake Victoria this morning. Perfect conditions for fishing.',
      image: '/placeholder.svg',
      likes: 67,
      comments: 12
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('feed')}</h2>
      
      {feedPosts.map(post => (
        <Card key={post.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.authorAvatar} alt={post.author} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-xs text-muted-foreground">{post.date}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="mb-3">{post.content}</p>
            <div className="bg-muted h-48 rounded-md overflow-hidden">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeedPage;
