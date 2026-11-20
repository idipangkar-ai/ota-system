import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {clearFrappeSession, getFrappeSession} from '../config/frappe';
import {getCurrentUser} from '../domains/feed/api/feedApi';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
  const [status, setStatus] = useState('checking');
  const [user, setUser] = useState(null);
  const [startupError, setStartupError] = useState('');

  const restoreSession = useCallback(async () => {
    setStatus('checking');
    setStartupError('');
    let sid;
    try {
      sid = await getFrappeSession();
    } catch (error) {
      setStartupError(error.message || 'Secure session storage is unavailable.');
      setStatus('retry');
      return;
    }
    if (!sid) {
      setUser(null);
      setStatus('signedOut');
      return;
    }

    try {
      const currentUser = await getCurrentUser();
      if (!currentUser || currentUser === 'Guest') {
        await clearFrappeSession();
        setUser(null);
        setStatus('signedOut');
        return;
      }
      setUser(currentUser);
      setStatus('signedIn');
    } catch (error) {
      if (error.status) {
        await clearFrappeSession();
        setUser(null);
        setStatus('signedOut');
      } else {
        setStartupError(error.message || 'Unable to reach the Frappe server.');
        setStatus('retry');
      }
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const signIn = useCallback(async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser === 'Guest') {
      await clearFrappeSession();
      throw new Error('The Frappe session could not be validated.');
    }
    setUser(currentUser);
    setStatus('signedIn');
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setStatus('signedOut');
  }, []);

  return (
    <AuthContext.Provider
      value={{status, user, startupError, restoreSession, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
