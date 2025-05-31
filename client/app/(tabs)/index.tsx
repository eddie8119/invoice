import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>發票管理系統</Text>
      <View style={styles.buttonContainer}>
        <Link href="/scan" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>掃描發票</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/invoice-report" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>發票報表</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
