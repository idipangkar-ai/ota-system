import React, {useState} from 'react';
import WelcomeScreen from '../domains/auth/screens/WelcomeScreen';
import LoginScreen from '../domains/auth/screens/LoginScreen';
import RegisterScreen from '../domains/auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../domains/auth/screens/ForgotPasswordScreen';

export default function AuthNavigator({onLogin}) {
  const [screen, setScreen] = useState('welcome');
  const navigate = next => setScreen(next);
  if (screen === 'login') return <LoginScreen navigate={navigate} onLogin={onLogin} />;
  if (screen === 'register') return <RegisterScreen navigate={navigate} />;
  if (screen === 'forgot') return <ForgotPasswordScreen navigate={navigate} />;
  return <WelcomeScreen navigate={navigate} />;
}
