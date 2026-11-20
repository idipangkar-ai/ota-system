import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import FeedHeader from '../components/FeedHeader';
import WelcomeCard from '../components/WelcomeCard';
import FeedItem from '../components/FeedItem';
import {getCurrentUser} from '../api/feedApi';
import {logout} from '../../auth/api/authApi';

export default function FeedScreen({onLogout}) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(error => Alert.alert('Frappe error', error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
  Alert.alert(
    'Confirm logout',
    'Are you sure you want to leave?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            // Continue to login if server logout fails.
          }
          onLogout();
        },
      },
    ],
  );
};

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <FeedHeader />

        {loading ? (
          <ActivityIndicator size="large" color="#3155F5" />
        ) : (
          <>
            <WelcomeCard user={user} />

            <Text style={styles.section}>YOUR FEED</Text>

            <FeedItem
              number="001"
              title="Your Frappe connection"
              description="You are connected to your Frappe backend."
            />
            <FeedItem
              number="002"
              title="OTA test"
              description="Hello! This message came through OTA update."
            />

            <Text style={styles.version}>APP CONTENT VERSION 1.0.0</Text>

            <TouchableOpacity onPress={handleLogout} style={styles.logout}>
              <Text style={styles.logoutText}>Sign out</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F5F3EE'},
  container: {padding: 25, flexGrow: 1, gap: 28},
  section: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.5,
    color: '#85847E',
    marginBottom: -15,
  },
  version: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#85847E',
    marginTop: 10,
  },
  logout: {
  alignSelf: 'flex-start',
  backgroundColor: '#20211E',
  paddingVertical: 14,
  paddingHorizontal: 25,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#20211E',
  elevation: 3,
},

logoutText: {
  fontSize: 13,
  color: '#FFFFFF',
  fontWeight: '800',
  letterSpacing: 1,
},
});