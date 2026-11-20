import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function SplashScreen({error, onRetry}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <View style={styles.mark}><Text style={styles.markText}>O</Text></View>
        <Text style={styles.brand}>NORTHSTAR COMMERCE</Text>
        <Text style={styles.subtitle}>A considered shopping experience</Text>
        {error ? <>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.retry} onPress={onRetry}><Text style={styles.retryText}>Try again</Text></TouchableOpacity>
        </> : <ActivityIndicator style={styles.spinner} color="#2458A6" size="small" />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({safe: {flex: 1, backgroundColor: '#F4F6F9'}, center: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28}, mark: {width: 54, height: 54, borderRadius: 14, backgroundColor: '#2458A6', justifyContent: 'center', alignItems: 'center'}, markText: {fontSize: 30, color: '#FFFFFF', fontWeight: '800'}, brand: {fontSize: 13, fontWeight: '800', letterSpacing: 2, color: '#1C2B45', marginTop: 18}, subtitle: {fontSize: 14, color: '#738096', marginTop: 8}, error: {fontSize: 14, color: '#6A7588', textAlign: 'center', marginTop: 28}, retry: {marginTop: 18, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 9, backgroundColor: '#2458A6'}, retryText: {color: '#FFFFFF', fontWeight: '700'}, spinner: {marginTop: 34}});
