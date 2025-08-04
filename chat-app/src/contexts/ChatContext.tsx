import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  roomId: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
}

export interface OnlineUser {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'away' | 'busy';
}

interface ChatContextType {
  rooms: ChatRoom[];
  messages: { [roomId: string]: Message[] };
  onlineUsers: OnlineUser[];
  activeRoom: string | null;
  typingUsers: { [roomId: string]: string[] };
  setActiveRoom: (roomId: string) => void;
  sendMessage: (content: string, roomId: string) => void;
  createRoom: (name: string, type: 'direct' | 'group', participants: string[]) => void;
  startTyping: (roomId: string) => void;
  stopTyping: (roomId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const mockOnlineUsers: OnlineUser[] = [
  {
    id: '2',
    username: 'priya_patel',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  },
  {
    id: '3',
    username: 'amit_kumar',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'away'
  },
  {
    id: '4',
    username: 'sneha_singh',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  },
  {
    id: '5',
    username: 'vikram_gupta',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'busy'
  }
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<{ [roomId: string]: Message[] }>({});
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<{ [roomId: string]: string[] }>({});
  const [onlineUsers] = useState<OnlineUser[]>(mockOnlineUsers);

  useEffect(() => {
    if (user) {
      // Initialize with some default rooms
      const defaultRooms: ChatRoom[] = [
        {
          id: 'general',
          name: 'General Chat',
          type: 'group',
          participants: ['1', '2', '3', '4', '5'],
          unreadCount: 2,
          avatar: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          id: 'direct-2',
          name: 'Priya Patel',
          type: 'direct',
          participants: ['1', '2'],
          unreadCount: 0,
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          id: 'tech-group',
          name: 'Tech Enthusiasts',
          type: 'group',
          participants: ['1', '3', '5'],
          unreadCount: 1,
          avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        }
      ];

      const defaultMessages = {
        'general': [
          {
            id: '1',
            senderId: '2',
            senderName: 'Priya Patel',
            content: 'Hey everyone! How is everyone doing today?',
            timestamp: new Date(Date.now() - 3600000),
            type: 'text' as const,
            roomId: 'general'
          },
          {
            id: '2',
            senderId: '3',
            senderName: 'Amit Kumar',
            content: 'All good here! Just finished a great project. How about you?',
            timestamp: new Date(Date.now() - 3000000),
            type: 'text' as const,
            roomId: 'general'
          }
        ],
        'direct-2': [
          {
            id: '3',
            senderId: '2',
            senderName: 'Priya Patel',
            content: 'Hi! Are we still on for the meeting tomorrow?',
            timestamp: new Date(Date.now() - 1800000),
            type: 'text' as const,
            roomId: 'direct-2'
          }
        ],
        'tech-group': [
          {
            id: '4',
            senderId: '5',
            senderName: 'Vikram Gupta',
            content: 'Check out this new React feature! It\'s amazing.',
            timestamp: new Date(Date.now() - 900000),
            type: 'text' as const,
            roomId: 'tech-group'
          }
        ]
      };

      setRooms(defaultRooms);
      setMessages(defaultMessages);
      setActiveRoom('general');
    }
  }, [user]);

  const sendMessage = (content: string, roomId: string) => {
    if (!user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.username,
      content,
      timestamp: new Date(),
      type: 'text',
      roomId
    };

    setMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMessage]
    }));

    // Update room's last message
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, lastMessage: newMessage }
        : room
    ));

    // Simulate receiving messages from other users
    setTimeout(() => {
      if (Math.random() > 0.3) {
        const responses = [
          'That\'s interesting!',
          'I agree with you.',
          'Thanks for sharing!',
          'Great point!',
          'Let me think about that.',
          'Absolutely right!',
          'I was thinking the same thing.',
          'Good to know!'
        ];
        
        const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: randomUser.id,
          senderName: randomUser.username,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          type: 'text',
          roomId
        };

        setMessages(prev => ({
          ...prev,
          [roomId]: [...(prev[roomId] || []), response]
        }));
      }
    }, 1000 + Math.random() * 3000);
  };

  const createRoom = (name: string, type: 'direct' | 'group', participants: string[]) => {
    const newRoom: ChatRoom = {
      id: Date.now().toString(),
      name,
      type,
      participants: [...participants, user!.id],
      unreadCount: 0,
      avatar: type === 'group' 
        ? 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        : onlineUsers.find(u => participants.includes(u.id))?.avatar
    };

    setRooms(prev => [...prev, newRoom]);
    setMessages(prev => ({ ...prev, [newRoom.id]: [] }));
    setActiveRoom(newRoom.id);
  };

  const startTyping = (roomId: string) => {
    if (!user) return;
    
    setTypingUsers(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []).filter(id => id !== user.id), user.id]
    }));
  };

  const stopTyping = (roomId: string) => {
    if (!user) return;
    
    setTypingUsers(prev => ({
      ...prev,
      [roomId]: (prev[roomId] || []).filter(id => id !== user.id)
    }));
  };

  return (
    <ChatContext.Provider value={{
      rooms,
      messages,
      onlineUsers,
      activeRoom,
      typingUsers,
      setActiveRoom,
      sendMessage,
      createRoom,
      startTyping,
      stopTyping
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}