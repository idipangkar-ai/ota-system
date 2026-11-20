import React, {useState} from 'react';
import {ActivityIndicator, Alert, Text, TextInput, TouchableOpacity} from 'react-native';
import AuthFrame, {authStyles as styles} from '../components/AuthFrame';
import {requestPasswordReset} from '../api/authApi';

export default function ForgotPasswordScreen({navigate}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!email.trim()) return Alert.alert('Email required', 'Enter the email address on your account.');
    setLoading(true);
    try {
      await requestPasswordReset(email);
      Alert.alert('Check your inbox', 'If this email is registered, Frappe has sent password reset instructions.', [{text: 'Return to sign in', onPress: () => navigate('login')}]);
    } catch (error) { Alert.alert('Unable to request reset', error.message); }
    finally { setLoading(false); }
  };
  return (
    <AuthFrame eyebrow="Account recovery" title="Reset your password" subtitle="Enter your account email and we’ll ask Frappe to send reset instructions.">
      <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#929CAB" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" />
      <TouchableOpacity style={styles.button} onPress={submit} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Send reset instructions</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.centeredLinkRow} onPress={() => navigate('login')}><Text style={styles.link}>Back to sign in</Text></TouchableOpacity>
    </AuthFrame>
  );
}
