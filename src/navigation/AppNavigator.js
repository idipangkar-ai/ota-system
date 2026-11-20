import React from 'react';
import {AuthProvider, useAuth} from './AuthProvider';
import AuthNavigator from './AuthNavigator';
import SplashScreen from './SplashScreen';
import TabNavigator from './TabNavigator';

function NavigationRoot() {
  const {status, startupError, restoreSession, signIn, signOut} = useAuth();
  if (status === 'checking') return <SplashScreen />;
  if (status === 'retry') return <SplashScreen error={startupError} onRetry={restoreSession} />;
  if (status === 'signedIn') return <TabNavigator onSignOut={signOut} />;
  return <AuthNavigator onLogin={signIn} />;
}

export default function AppNavigator() {
  return <AuthProvider><NavigationRoot /></AuthProvider>;
}
