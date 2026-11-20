
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function WelcomeCard({user}) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.eyebrow}>OTA / YOUR SPACE</Text>
          <Text style={styles.status}>YOUR PERSONAL DASHBOARD</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.main}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.title}>
          {user || 'Friend'}<Text style={styles.accent}>.</Text>
        </Text>
        <Text style={styles.subtitle}>
          A better experience starts here.
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.footerLabel}>YOUR APP</Text>
          <Text style={styles.footerValue}>Always improving.</Text>
        </View>
        <Text style={styles.number}>01 — 2026</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#20211E',
    borderRadius: 24,
    padding: 25,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2.5,
  },
  status: {
    color: '#A5A49D',
    fontSize: 8,
    letterSpacing: 1.5,
    marginTop: 6,
  },
  badge: {
    backgroundColor: '#E9A34B',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeText: {
    color: '#20211E',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  main: {
    marginTop: 42,
  },
  greeting: {
    color: '#B7B5AC',
    fontSize: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1.5,
    marginTop: 8,
  },
  accent: {
    color: '#E9A34B',
  },
  subtitle: {
    color: '#B7B5AC',
    fontSize: 12,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#44453F',
    marginTop: 32,
    marginBottom: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLabel: {
    color: '#A5A49D',
    fontSize: 8,
    letterSpacing: 2,
  },
  footerValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
  },
  number: {
    color: '#A5A49D',
    fontSize: 9,
    fontWeight: '700',
  },
});
