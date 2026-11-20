import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function EmailInput({value, onChangeText}) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Email address"
      placeholderTextColor="#85847E"
      value={value}
      onChangeText={onChangeText}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#DFDDD5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#20211E',
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
  },
});