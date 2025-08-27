
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getAuth, updatePassword } from 'firebase/auth';

export default function ResetPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onReset = async () => {
    if (!password || !confirm) {
      return Alert.alert('Error', 'Please fill all fields.');
    }
    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters.');
    }
    if (password !== confirm) {
      return Alert.alert('Error', 'Passwords do not match.');
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await updatePassword(user, password);
        Alert.alert('Success', 'Password reset successfully!', [
          {
            text: 'Continue',
            onPress: () => navigation.replace('Signup'), // Replace with your login or home screen
          },
        ]);
      } else {
        Alert.alert('Error', 'No user is currently signed in.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Create a new password below</Text>

      <Text style={styles.label}>New Password</Text>
        <TextInput
        placeholderTextColor='gray'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Enter new password"
      />

      <Text style={styles.label}>Confirm Password</Text>
        <TextInput
        placeholderTextColor='gray'
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        style={styles.input}
        placeholder="Confirm your password"
      />

      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 40 },
  subtitle: { fontSize: 14, color: '#777', marginVertical: 10 },

  label: { fontSize: 14, color: '#555', marginTop: 20 },
      input: {
    color:"black",
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },

  button: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
