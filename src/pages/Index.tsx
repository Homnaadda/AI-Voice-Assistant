import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LandingPage from '@/components/LandingPage';
import VoiceAssistant from '@/components/VoiceAssistant';
import SignInPage from '@/components/auth/SignInPage';
import SignUpPage from '@/components/auth/SignUpPage';

type ViewType = 'landing' | 'signin' | 'signup' | 'assistant';

const Index = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('landing');

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl font-light">Loading...</div>
      </div>
    );
  }

  // If user is authenticated, show assistant directly
  if (user && currentView !== 'assistant') {
    setCurrentView('assistant');
  }

  const handleGetStarted = () => {
    if (user) {
      setCurrentView('assistant');
    } else {
      setCurrentView('signin');
    }
  };

  const handleSignInSuccess = () => {
    setCurrentView('assistant');
  };

  const handleSignUpSuccess = () => {
    setCurrentView('signin');
  };

  const handleBack = () => {
    if (user) {
      setCurrentView('assistant');
    } else {
      setCurrentView('landing');
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  // Handle logout - redirect to landing page
  const handleLogout = () => {
    setCurrentView('landing');
  };

  switch (currentView) {
    case 'signin':
      return (
        <SignInPage
          onSignUp={() => setCurrentView('signup')}
          onSignInSuccess={handleSignInSuccess}
          onBack={handleBack}
        />
      );
    
    case 'signup':
      return (
        <SignUpPage
          onSignIn={() => setCurrentView('signin')}
          onSignUpSuccess={handleSignUpSuccess}
          onBack={handleBack}
        />
      );
    
    case 'assistant':
      return (
        <VoiceAssistant 
          onBack={user ? undefined : handleBackToLanding} 
          onLogout={handleLogout}
        />
      );
    
    default:
      return <LandingPage onGetStarted={handleGetStarted} />;
  }
};

export default Index;