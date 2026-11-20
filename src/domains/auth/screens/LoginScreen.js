import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import AuthFrame, {authStyles as styles} from '../components/AuthFrame';
import {login} from '../api/authApi';

export default function LoginScreen({onLogin, navigate}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!email.trim() || !password) return Alert.alert('Details required', 'Enter your email and password.');
    setLoading(true);
    try {
      await login(email, password);
      await onLogin();
    } catch (error) {
      Alert.alert('Unable to sign in', error.message);
    } finally { setLoading(false); }
  };
  return (
    <AuthFrame eyebrow="Customer account" title="Welcome back" subtitle="Sign in to continue to your account and shopping experience.">
      <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#929CAB" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#929CAB" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" autoComplete="password" onSubmitEditing={submit} />
      <TouchableOpacity style={styles.button} onPress={submit} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Sign in securely</Text>}
      </TouchableOpacity>
      <View style={styles.linkRow}>
        <TouchableOpacity onPress={() => navigate('forgot')}><Text style={styles.link}>Forgot password?</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('register')}><Text style={styles.link}>Create account</Text></TouchableOpacity>
      </View>
    </AuthFrame>
  );
}
