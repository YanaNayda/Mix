import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

export default function LevelMapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Level map</Text>
      <Text style={styles.subtitle}>Progress, levels, and unlocks.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748b',
  },
});
