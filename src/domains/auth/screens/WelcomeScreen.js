import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AuthFrame, {authStyles} from '../components/AuthFrame';

export default function WelcomeScreen({navigate}) {
  return (
    <AuthFrame eyebrow="Thoughtful shopping" title="A better way to shop." subtitle="Discover a considered collection, with service designed around you.">
      <View style={styles.editCard}>
        <Text style={styles.editLabel}>NORTHSTAR EDIT</Text>
        <Text style={styles.editTitle}>Quality essentials, selected with care.</Text>
        <Text style={authStyles.note}>Your account keeps orders, preferences and support in one place.</Text>
      </View>
      <TouchableOpacity style={authStyles.button} onPress={() => navigate('login')}><Text style={authStyles.buttonText}>Sign in</Text></TouchableOpacity>
      <TouchableOpacity style={[authStyles.button, styles.secondaryButton]} onPress={() => navigate('register')}><Text style={[authStyles.buttonText, styles.secondaryButtonText]}>Create an account</Text></TouchableOpacity>
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  editCard: {backgroundColor: '#E8EEF7', borderRadius: 16, padding: 24, marginBottom: 18},
  editLabel: {fontSize: 11, color: '#526783', fontWeight: '700', letterSpacing: 1.2},
  editTitle: {fontSize: 22, lineHeight: 29, color: '#1C2B45', fontWeight: '700', marginTop: 15},
  secondaryButton: {backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DCE2EA'},
  secondaryButtonText: {color: '#2458A6'},
});
