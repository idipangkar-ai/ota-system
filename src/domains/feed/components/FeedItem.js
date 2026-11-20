import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function FeedItem({number, title, description}) {
  return (
    <View style={styles.item}>
      <View style={styles.numberBox}>
        <Text style={styles.number}>{number}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Text style={styles.arrow}>↗</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 2,
  },
  numberBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F5F3EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  number: {
    color: '#3155F5',
    fontSize: 10,
    fontWeight: '900',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#20211E',
  },
  description: {
    fontSize: 11,
    color: '#85847E',
    marginTop: 5,
  },
  arrow: {
    fontSize: 19,
    color: '#3155F5',
    marginLeft: 8,
  },
});