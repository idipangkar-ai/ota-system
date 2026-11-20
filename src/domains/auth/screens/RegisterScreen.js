import React, {useState} from 'react';
import {ActivityIndicator, Alert, Text, TextInput, TouchableOpacity} from 'react-native';
import AuthFrame, {authStyles as styles} from '../components/AuthFrame';
import {register} from '../api/authApi';

export default function RegisterScreen({navigate}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!name.trim() || !email.trim()) return Alert.alert('Details required', 'Enter your name and email address.');
    setLoading(true);
    try {
      const result = await register(name, email);
      const message = Array.isArray(result.message) ? result.message[1] : result.message;
      Alert.alert('Request received', message || 'Please check your email for next steps.', [{text: 'Continue', onPress: () => navigate('login')}]);
    } catch (error) { Alert.alert('Unable to create account', error.message); }
    finally { setLoading(false); }
  };
  return (
    <AuthFrame eyebrow="New customer" title="Create your account" subtitle="Set up your account to keep your shopping details together.">
      <TextInput style={styles.input} placeholder="Full name" placeholderTextColor="#929CAB" value={name} onChangeText={setName} autoCapitalize="words" autoComplete="name" />
      <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#929CAB" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" />
      <Text style={styles.note}>Account availability follows your Frappe site’s signup settings.</Text>
      <TouchableOpacity style={styles.button} onPress={submit} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Request an account</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.centeredLinkRow} onPress={() => navigate('login')}><Text style={styles.link}>Already have an account? Sign in</Text></TouchableOpacity>
    </AuthFrame>
  );
}
