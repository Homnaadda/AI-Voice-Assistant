import React from 'react';
import { Mic, Brain, MessageSquare, Zap, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8">
          <nav className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">How it works</a>
            </div>
            <div className="flex items-center gap-6">
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-white tracking-tight leading-tight">
                  Your AI Voice
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Assistant
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
                  Experience the future of AI interaction with natural voice conversations, 
                  powered by advanced Qwen technology and premium voice synthesis.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-8 py-4 text-lg font-light shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
                >
                  Start Talking
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-4 text-lg font-light backdrop-blur-sm"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-light text-white">99.9%</div>
                  <div className="text-white/60 text-sm">Accuracy Rate</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-light text-white">&lt;1s</div>
                  <div className="text-white/60 text-sm">Response Time</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-light text-white">24/7</div>
                  <div className="text-white/60 text-sm">Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-thin text-white tracking-tight">
                Powerful Features
              </h2>
              <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
                Everything you need for seamless AI voice interactions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Voice Recognition</h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    Advanced speech recognition with support for natural language processing and multiple accents.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white">AI Intelligence</h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    Powered by Qwen's advanced language model for intelligent, contextual conversations.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Natural Conversations</h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    Engage in natural, flowing conversations with context awareness and memory.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Real-time Processing</h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    Lightning-fast response times with real-time speech processing and synthesis.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Premium Voice</h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    High-quality voice synthesis with ElevenLabs integration for natural-sounding responses.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Multi-modal</h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    Support for both voice and text input with seamless switching between modes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-thin text-white tracking-tight">
                How It Works
              </h2>
              <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
                Simple steps to start your AI conversation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-light">
                  1
                </div>
                <h3 className="text-xl font-medium text-white">Tap to Speak</h3>
                <p className="text-white/70 font-light leading-relaxed">
                  Simply tap the microphone button and start speaking naturally. No complex setup required.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-light">
                  2
                </div>
                <h3 className="text-xl font-medium text-white">AI Processing</h3>
                <p className="text-white/70 font-light leading-relaxed">
                  Our advanced AI understands your request and generates intelligent, contextual responses.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-light">
                  3
                </div>
                <h3 className="text-xl font-medium text-white">Voice Response</h3>
                <p className="text-white/70 font-light leading-relaxed">
                  Receive natural-sounding voice responses with premium audio quality and human-like intonation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-thin text-white tracking-tight">
                  Ready to Experience AI?
                </h2>
                <p className="text-xl text-white/70 font-light leading-relaxed">
                  Start your first conversation with our advanced AI voice assistant today.
                </p>
              </div>
              
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-12 py-6 text-xl font-light shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
              >
                Get Started Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/70 font-light">AI Voice Assistant</span>
              </div>
              <div className="text-white/50 text-sm font-light">
                Powered by Qwen & ElevenLabs
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;