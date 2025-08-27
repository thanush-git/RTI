import { signInWithPhoneNumber } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/firebase';

export default function OtpVerification({ route, navigation }) {
  const { value: phoneNumber } = route.params;
  const [verification, setVerification] = useState(null);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  const sendOTP = async () => {
    try {
      // Use web Firebase Auth as shown in the article
      const confirmation = await signInWithPhoneNumber(auth, `+1${phoneNumber}`);

      setVerification(confirmation);
      Alert.alert('OTP sent!');
    } catch (err) {
      console.error('OTP error:', err);
      Alert.alert('Error sending OTP', err.message || 'Unexpected error');
    }
  };

  const confirmCode = async () => {
    try {
      const otpCode = code.join('');
      if (otpCode.length !== 6) {
        setError('Please enter all 6 digits');
        return;
      }
      await verification.confirm(otpCode);
      Alert.alert('Phone verified!');
      navigation.navigate('ResetPassword', { phone: phoneNumber });
    } catch (err) {
      console.error('Verification error:', err);
      setError('Invalid OTP. Please try again.');
    }
  };

  useEffect(() => {
    sendOTP();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to +1{phoneNumber}</Text>

      <View style={styles.otpContainer}>
        {code.map((digit, index) => (
            <TextInput
        placeholderTextColor='gray'
            key={index}
            ref={inputRefs.current[index]}
            style={[styles.otpInput, error && styles.errorInput]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => {
              const newCode = [...code];
              newCode[index] = text;
              setCode(newCode);
              setError('');

              if (text.length === 1 && index < 5) {
                inputRefs.current[index + 1].current.focus();
              }
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                inputRefs.current[index - 1].current.focus();
              }
            }}
          />
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={confirmCode}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#777', marginBottom: 30 },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f5f5f5',
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
