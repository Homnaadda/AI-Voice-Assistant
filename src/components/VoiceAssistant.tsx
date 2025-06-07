import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ChatMessage from './ChatMessage';
import SiriWaveform from './SiriWaveform';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
}

const VoiceAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  
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
      text: "Hi there! I'm your AI assistant. How can I help you today?",
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

  const shouldGenerateImage = (text: string): boolean => {
    const imageKeywords = [
      'show me', 'picture of', 'image of', 'photo of', 'what does', 'look like',
      'appearance', 'visual', 'see', 'draw', 'create image', 'generate image'
    ];
    return imageKeywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  const generateImage = async (prompt: string): Promise<string | null> => {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${QWEN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          quality: 'standard',
        }),
      });

      if (!response.ok) {
        console.error('Image generation failed:', response.status);
        return null;
      }

      const data = await response.json();
      return data.data[0]?.url || null;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
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
      console.log('Making API request to OpenRouter...');
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${QWEN_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Voice Assistant',
        },
        body: JSON.stringify({
          model: 'qwen/qwen-2.5-coder-32b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI voice assistant powered by Qwen3 235B. Provide concise, friendly, and informative responses. Keep your answers clear and conversational since they will be spoken aloud.'
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
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, I could not process your request.';

      // Check if we should generate an image
      let imageUrl = null;
      if (shouldGenerateImage(text)) {
        console.log('Generating image for:', text);
        imageUrl = await generateImage(text);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        imageUrl,
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
        description: `Failed to get AI response: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
        <Card className="p-8 bg-black/20 backdrop-blur-2xl border-white/10 rounded-3xl max-w-md w-full shadow-2xl">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <Volume2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-light text-white mb-2">AI Assistant</h2>
              <p className="text-white/70 text-sm font-light">
                Enter your ElevenLabs API key for premium voice synthesis
              </p>
            </div>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="ElevenLabs API Key (optional)"
                value={elevenLabsKey}
                onChange={(e) => setElevenLabsKey(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 rounded-2xl backdrop-blur-sm"
              />
              <div className="flex gap-3">
                <Button 
                  onClick={handleKeySubmit}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-2xl border-0 shadow-lg transition-all duration-300"
                  disabled={!elevenLabsKey.trim()}
                >
                  Connect
                </Button>
                <Button 
                  onClick={() => setShowKeyInput(false)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-2xl backdrop-blur-sm"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Glassmorphism background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col h-screen">
        {/* Minimal Header */}
        <div className="p-6 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <h1 className="text-lg font-medium text-white/90">AI Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMessages(!showMessages)}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeyInput(true)}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Siri Interface */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-12 max-w-lg w-full">
            {/* Main Siri Orb */}
            <div className="relative flex items-center justify-center">
              <div 
                className={`relative w-40 h-40 rounded-full transition-all duration-700 cursor-pointer ${
                  isListening 
                    ? 'bg-gradient-to-br from-blue-400/30 to-purple-500/30 scale-110 shadow-2xl shadow-blue-500/30' 
                    : isProcessing
                    ? 'bg-gradient-to-br from-purple-400/30 to-pink-500/30 scale-105 shadow-xl shadow-purple-500/20'
                    : isSpeaking
                    ? 'bg-gradient-to-br from-green-400/30 to-blue-500/30 scale-105 shadow-xl shadow-green-500/20'
                    : 'bg-white/5 hover:bg-white/10 hover:scale-105 shadow-lg'
                } backdrop-blur-xl border border-white/20`}
                onClick={isListening ? stopListening : startListening}
              >
                {/* Inner glow effect */}
                <div className={`absolute inset-2 rounded-full transition-all duration-500 ${
                  isListening || isProcessing || isSpeaking 
                    ? 'bg-gradient-to-br from-white/20 to-white/5' 
                    : 'bg-white/5'
                } backdrop-blur-sm`} />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isListening ? (
                    <div className="relative">
                      <MicOff className="w-12 h-12 text-white drop-shadow-lg" />
                      <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <Mic className="w-12 h-12 text-white/90 drop-shadow-lg" />
                  )}
                </div>
                
                {/* Animated Waveform */}
                {(isListening || isProcessing || isSpeaking) && (
                  <div className="absolute inset-0">
                    <SiriWaveform 
                      isActive={isListening || isProcessing || isSpeaking}
                      type={isListening ? 'listening' : isProcessing ? 'processing' : 'speaking'}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Status Text */}
            <div className="space-y-4">
              <div className="text-center min-h-[2rem]">
                {isListening && (
                  <p className="text-white text-xl font-light animate-pulse">Listening...</p>
                )}
                {isProcessing && (
                  <p className="text-white/90 text-xl font-light">Thinking...</p>
                )}
                {isSpeaking && (
                  <p className="text-white/90 text-xl font-light">Speaking...</p>
                )}
                {!isListening && !isProcessing && !isSpeaking && (
                  <p className="text-white/60 text-lg font-light">Tap to speak or type below</p>
                )}
              </div>

              {/* Text Input */}
              <form onSubmit={handleTextSubmit} className="max-w-sm mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Ask me anything..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    disabled={isProcessing || isSpeaking}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 rounded-full py-3 px-6 backdrop-blur-sm text-center focus:bg-white/15 focus:border-white/30 transition-all duration-300"
                  />
                  {textInput && (
                    <Button
                      type="submit"
                      disabled={!textInput.trim() || isProcessing || isSpeaking}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full w-8 h-8 p-0 text-xs"
                    >
                      →
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Messages Panel */}
        {showMessages && messages.length > 1 && (
          <div className="backdrop-blur-xl bg-black/20 border-t border-white/10 max-h-80 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/90 font-medium">Conversation</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMessages(false)}
                  className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1"
                >
                  ×
                </Button>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {messages.slice(1).map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
