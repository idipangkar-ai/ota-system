import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function FeedHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.brand}>STUDIO / 01</Text>
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 3,
    color: '#20211E',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 10,
    backgroundColor: '#3155F5',
  },
});