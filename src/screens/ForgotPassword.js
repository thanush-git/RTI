import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth } from '../../config/firebase';

export default function ForgotPassword({ navigation }) {
  const [method, setMethod] = useState('email'); 
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!inputValue) {
      setError('This field is required');
      return false;
    }

    if (method === 'email') {
      const emailValid = /\S+@\S+\.\S+/.test(inputValue);
      if (!emailValid) {
        setError('Enter a valid email');
        return false;
      }
    } else {
      const phoneValid = /^\d{10}$/.test(inputValue);
      if (!phoneValid) {
        setError('Enter a valid 10-digit phone number');
        return false;
      }
    }

    setError('');
    return true;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    if (method === 'email') {
      try {
        await sendPasswordResetEmail(auth, inputValue);
        Alert.alert('Success', 'Password reset email sent!');
        navigation.goBack(); // Go back to login screen or wherever you want
      } catch (err) {
        console.error(err);
        setError('Failed to send reset email. Make sure the email is registered.');
      }
    } else {
      navigation.navigate('OtpVerification', { method, value: inputValue });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Don’t worry. It happens.</Text>

      {/* Method Switch */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchBtn, method === 'email' && styles.switchBtnActive]}
          onPress={() => {
            setMethod('email');
            setInputValue('');
            setError('');
          }}
        >
          <Text style={method === 'email' ? styles.switchTextActive : styles.switchText}>
            Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.switchBtn, method === 'phone' && styles.switchBtnActive]}
          onPress={() => {
            setMethod('phone');
            setInputValue('');
            setError('');
          }}
        >
          <Text style={method === 'phone' ? styles.switchTextActive : styles.switchText}>
            Phone
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Input */}
      <Text style={styles.label}>
        {method === 'email' ? 'Email Address' : 'Phone Number'}
      </Text>
        <TextInput
        placeholderTextColor='gray'
        value={inputValue}
        onChangeText={(text) => {
          setInputValue(text);
          setError('');
        }}
        placeholder={method === 'email' ? 'Enter your email' : 'Enter 10-digit phone'}
        style={[styles.input, error && styles.errorInput]}
        keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 50 },
  subtitle: { fontSize: 14, color: '#777', marginBottom: 30 },

  switchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  switchBtnActive: {
    backgroundColor: '#2F6BFF',
  },
  switchText: { color: '#555', fontWeight: '500' },
  switchTextActive: { color: '#fff', fontWeight: '600' },

  label: { fontSize: 14, color: '#333', marginBottom: 6 },
      input: {
    color:"black",
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  errorInput: { borderColor: '#FF5A5F' },
  errorText: { color: '#FF5A5F', fontSize: 12, marginBottom: 10 },

  button: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
