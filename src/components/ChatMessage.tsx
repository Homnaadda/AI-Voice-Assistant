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
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar with iPhone-style design */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg backdrop-blur-sm ${
          message.isUser 
            ? 'bg-gradient-to-br from-blue-500/80 to-blue-600/80 border border-blue-400/30' 
            : 'bg-gradient-to-br from-purple-500/80 to-pink-500/80 border border-purple-400/30'
        }`}>
          {message.isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content with enhanced iPhone-style design */}
        <div className={`backdrop-blur-xl border rounded-3xl p-5 shadow-lg transition-all duration-300 ${
          message.isUser 
            ? 'bg-blue-500/20 border-blue-400/30 text-white' 
            : 'bg-white/10 border-white/20 text-white'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-light">{message.text}</p>
          
          {/* Display image if present */}
          {message.imageUrl && (
            <div className="mt-4">
              <img 
                src={message.imageUrl} 
                alt="Generated image" 
                className="rounded-2xl max-w-full h-auto shadow-lg border border-white/20"
                loading="lazy"
              />
            </div>
          )}
          
          <div className={`text-xs opacity-50 mt-3 font-light ${message.isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;