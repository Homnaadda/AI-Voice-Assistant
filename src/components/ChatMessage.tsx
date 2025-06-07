
import React from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
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
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex items-start space-x-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
          message.isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
            : 'bg-gradient-to-br from-purple-500 to-pink-500'
        }`}>
          {message.isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg ${
          message.isUser 
            ? 'bg-blue-500/20 text-white' 
            : 'bg-white/10 text-white'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-light">{message.text}</p>
          
          {/* Display image if present */}
          {message.imageUrl && (
            <div className="mt-3">
              <img 
                src={message.imageUrl} 
                alt="Generated image" 
                className="rounded-xl max-w-full h-auto shadow-lg border border-white/20"
                loading="lazy"
              />
            </div>
          )}
          
          <div className={`text-xs opacity-60 mt-2 font-light ${message.isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
