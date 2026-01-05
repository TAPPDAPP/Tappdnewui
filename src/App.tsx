import { useState } from "react";
import { LoadingLanding } from "./components/onboarding/LoadingLanding";
import { AuthScreen } from "./components/onboarding/AuthScreen";
import { LoginScreen } from "./components/onboarding/LoginScreen";
import { SignupFlow } from "./components/onboarding/SignupFlow";
import { MainApp } from "./components/MainApp";
import { ViewportHandler } from "./components/ViewportHandler";

type AppState = 'landing' | 'auth' | 'login' | 'signup' | 'app';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');

  const handleLandingComplete = () => {
    setAppState('auth');
  };

  const handleShowLogin = () => {
    setAppState('login');
  };

  const handleShowSignup = () => {
    setAppState('signup');
  };

  const handleBackToAuth = () => {
    setAppState('auth');
  };

  const handleLogin = () => {
    setAppState('app');
  };

  const handleSignupComplete = () => {
    setAppState('app');
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password clicked');
  };

  const renderCurrentScreen = () => {
    switch (appState) {
      case 'landing':
        return <LoadingLanding onComplete={handleLandingComplete} />;
      
      case 'auth':
        return (
          <AuthScreen 
            onLogin={handleShowLogin} 
            onSignup={handleShowSignup} 
          />
        );
      
      case 'login':
        return (
          <LoginScreen 
            onBack={handleBackToAuth}
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
          />
        );
      
      case 'signup':
        return (
          <SignupFlow 
            onBack={handleBackToAuth}
            onComplete={handleSignupComplete}
          />
        );
      
      case 'app':
        return <MainApp />;
      
      default:
        return <LoadingLanding onComplete={handleLandingComplete} />;
    }
  };

  return (
    <>
      <ViewportHandler />
      <div className="min-h-screen-mobile w-full bg-background">
        <div className="w-full max-w-sm mx-auto min-h-screen-mobile relative">
          {renderCurrentScreen()}
        </div>
      </div>
    </>
  );
}