import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function PasswordInput({value, onChangeText}) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="#85847E"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry
      autoCapitalize="none"
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
  },
});