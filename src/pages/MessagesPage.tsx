
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MessageCircle, User } from 'lucide-react';

const MessagesPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  
  // Mock chats
  const chats = [
    {
      id: 1,
      name: 'Anna Schmidt',
      lastMessage: 'Are you going fishing tomorrow?',
      time: '2h ago',
      unread: 2,
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Thomas Weber',
      lastMessage: 'I found a great new fishing spot!',
      time: '5h ago',
      unread: 0,
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Marie Fischer',
      lastMessage: 'Did you see my catch?',
      time: 'Yesterday',
      unread: 0,
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Fishing Group',
      lastMessage: 'Max: Who is joining on Saturday?',
      time: 'Yesterday',
      unread: 5,
      avatar: '/placeholder.svg'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('messages')}</h2>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`${t('search')} ${t('messages')}...`}
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {selectedChat ? (
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => setSelectedChat(null)} className="pl-0">
            ← Back to chats
          </Button>
          
          <div className="flex items-center gap-3 pb-4 border-b">
            <Avatar>
              <AvatarImage 
                src={chats.find(c => c.id === selectedChat)?.avatar} 
                alt={chats.find(c => c.id === selectedChat)?.name} 
              />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="font-medium">{chats.find(c => c.id === selectedChat)?.name}</div>
          </div>
          
          <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-fischer-blue mx-auto mb-2" />
              <p>{t('chatPlaceholder')}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button>Send</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
              onClick={() => setSelectedChat(chat.id)}
            >
              <Avatar>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <div className="font-medium">{chat.name}</div>
                  <div className="text-xs text-muted-foreground">{chat.time}</div>
                </div>
                <div className="text-sm truncate text-muted-foreground">{chat.lastMessage}</div>
              </div>
              {chat.unread > 0 && (
                <div className="bg-fischer-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
