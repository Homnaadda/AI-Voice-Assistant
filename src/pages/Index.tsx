import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import VoiceAssistant from '@/components/VoiceAssistant';

const Index = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  const handleGetStarted = () => {
    setShowAssistant(true);
  };

  if (showAssistant) {
    return <VoiceAssistant />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;