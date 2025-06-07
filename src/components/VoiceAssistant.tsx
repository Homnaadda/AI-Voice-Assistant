
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const VoiceAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(true);
  
  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  const QWEN_API_KEY = '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';

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Could not understand speech. Please try again.",
          variant: "destructive",
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthesis.current = window.speechSynthesis;

    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: "Hello! I'm your AI voice assistant powered by Qwen 3. You can speak to me or type your questions. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const handleUserMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const response = await fetch('https://api.openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${QWEN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen/qwen-2.5-7b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI voice assistant. Provide concise, friendly, and informative responses. Keep your answers clear and conversational since they will be spoken aloud.'
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the response
      if (elevenLabsKey) {
        await speakWithElevenLabs(aiResponse);
      } else {
        speakWithBrowserTTS(aiResponse);
      }

    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while processing your request. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const speakWithElevenLabs = async (text: string) => {
    if (!elevenLabsKey) return;
    
    setIsSpeaking(true);
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('ElevenLabs API error');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      speakWithBrowserTTS(text);
    }
  };

  const speakWithBrowserTTS = (text: string) => {
    if (synthesis.current) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      synthesis.current.speak(utterance);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleUserMessage(textInput);
      setTextInput('');
    }
  };

  const handleKeySubmit = () => {
    if (elevenLabsKey.trim()) {
      setShowKeyInput(false);
      toast({
        title: "ElevenLabs Connected",
        description: "High-quality voice synthesis is now enabled!",
      });
    }
  };

  if (showKeyInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 max-w-md w-full">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Volume2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">AI Voice Assistant</h2>
              <p className="text-gray-300 text-sm">
                Enter your ElevenLabs API key for high-quality voice synthesis, or skip to use browser TTS.
              </p>
            </div>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="ElevenLabs API Key (optional)"
                value={elevenLabsKey}
                onChange={(e) => setElevenLabsKey(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleKeySubmit}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={!elevenLabsKey.trim()}
                >
                  Connect ElevenLabs
                </Button>
                <Button 
                  onClick={() => setShowKeyInput(false)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Skip
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Voice Assistant</h1>
              <p className="text-sm text-gray-400">Powered by Qwen 3</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isSpeaking && (
              <div className="flex items-center space-x-2 text-green-400">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Speaking...</span>
              </div>
            )}
            {isProcessing && (
              <div className="flex items-center space-x-2 text-blue-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="p-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleTextSubmit} className="flex items-center space-x-4">
            <Button
              type="button"
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing || isSpeaking}
              className={`w-12 h-12 rounded-full transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105'
              }`}
            >
              {isListening ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </Button>
            
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Type your message or use voice input..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                disabled={isProcessing || isSpeaking}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-sm"
              />
            </div>
            
            <Button
              type="submit"
              disabled={!textInput.trim() || isProcessing || isSpeaking}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Send
            </Button>
          </form>
          
          <p className="text-xs text-gray-400 text-center mt-3">
            {isListening ? 'Listening... Speak now!' : 'Click the microphone to start voice input or type your message'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
