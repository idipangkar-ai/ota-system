import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

export default function AuthFrame({children, eyebrow, title, subtitle}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.brandRow}>
          <View style={styles.mark}><Text style={styles.markText}>O</Text></View>
          <Text style={styles.brand}>NORTHSTAR <Text style={styles.brandSoft}>COMMERCE</Text></Text>
        </View>
        <View style={styles.content}>
          {!!eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
          {!!title && <Text style={styles.title}>{title}</Text>}
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          <View style={styles.body}>{children}</View>
        </View>
        <Text style={styles.footer}>SECURE CUSTOMER ACCESS</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export const authStyles = StyleSheet.create({
  input: {height: 54, borderWidth: 1, borderColor: '#E2E6EC', borderRadius: 10, paddingHorizontal: 16, fontSize: 15, color: '#17233A', backgroundColor: '#FFFFFF', marginBottom: 14},
  button: {height: 54, backgroundColor: '#2458A6', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10},
  buttonText: {color: '#FFFFFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.2},
  link: {color: '#2458A6', fontSize: 14, fontWeight: '600'},
  linkRow: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 22},
  centeredLinkRow: {flexDirection: 'row', justifyContent: 'center', marginTop: 22},
  note: {fontSize: 13, lineHeight: 19, color: '#6A7588', marginTop: 12},
});

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F4F6F9'},
  container: {flexGrow: 1, paddingHorizontal: 26, paddingVertical: 24, justifyContent: 'space-between'},
  brandRow: {flexDirection: 'row', alignItems: 'center', gap: 10},
  mark: {width: 34, height: 34, borderRadius: 9, backgroundColor: '#2458A6', alignItems: 'center', justifyContent: 'center'},
  markText: {fontSize: 19, fontWeight: '800', color: '#FFFFFF'},
  brand: {fontSize: 12, fontWeight: '800', letterSpacing: 1.6, color: '#1C2B45'},
  brandSoft: {fontWeight: '500', color: '#7C8798', letterSpacing: 1},
  content: {width: '100%', maxWidth: 480, alignSelf: 'center', paddingVertical: 42},
  eyebrow: {fontSize: 11, fontWeight: '700', letterSpacing: 1.5, color: '#718097', textTransform: 'uppercase'},
  title: {fontSize: 35, lineHeight: 43, fontWeight: '750', color: '#17233A', marginTop: 9},
  subtitle: {fontSize: 15, lineHeight: 22, color: '#667287', marginTop: 8},
  body: {marginTop: 28},
  footer: {fontSize: 10, fontWeight: '700', letterSpacing: 1.3, color: '#9AA4B2', textAlign: 'center'},
});
