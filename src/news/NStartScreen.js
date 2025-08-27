

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NStartScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image
        source={require('../Assets/LOGO.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>News2Day</Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NSignInScreen')} 
      >
        <Text style={styles.buttonText}>Get started ➔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F6BFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  buttonText: {
    color: '#2F6BFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
