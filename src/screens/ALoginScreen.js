import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [aadhar, setAadhar] = useState('');

  const handleLogin = async () => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.aadhar === aadhar);

    if (user) {
      // Save logged in user
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      navigation.navigate('PublishNewsScreen');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

        <TextInput
        placeholderTextColor='gray'
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
        <TextInput
        placeholderTextColor='gray'
        style={styles.input}
        placeholder="Aadhar Number"
        value={aadhar}
        onChangeText={setAadhar}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0077B6' },
      input: {
    color:"black", borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 6, marginBottom: 12 },
  button: { backgroundColor: '#0077B6', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
