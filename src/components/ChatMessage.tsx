
import React from 'react';
import { User, Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.isUser 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}>
          {message.isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content */}
        <Card className={`p-4 backdrop-blur-lg border-white/20 ${
          message.isUser 
            ? 'bg-blue-500/20 text-white' 
            : 'bg-white/10 text-white'
        }`}>
          <div className="space-y-2">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            <div className={`text-xs opacity-70 ${message.isUser ? 'text-right' : 'text-left'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
