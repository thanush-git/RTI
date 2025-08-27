import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPScreen({ route, navigation }) {
  const { confirmation } = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  async function loginWithPhone(firebaseToken) {
    try {
      const response = await fetch("https://api.rtiexpress.in/api/v1/auth/firebasePhone", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${firebaseToken}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.jwtRTIToken; // ✅ correct key
        if (!token) {
          throw new Error("jwtRTIToken missing in response");
        }

        await AsyncStorage.setItem("jwtRTIToken", token); // ✅ store under right key
        console.log("Login success:", data);
      } else {
        console.error("Login failed:", data);
        throw new Error(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }



  // Save user data after successful authentication
  const saveUserData = async (user) => {
    try {
      const userData = {
        uid: user.uid,
        phone: user.phoneNumber,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Firebase ID Token
      const idToken = await user.getIdToken();
      await AsyncStorage.setItem('authToken', idToken);
      console.log("Your Firebase ID Token:", idToken);

      // Exchange Firebase ID token for JWT
      await loginWithPhone(idToken);

    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleVerify = async () => {
    const otpCode = code.join('');
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    try {
      const result = await confirmation.confirm(otpCode);
      const user = result.user;

      // Save user data locally
      await saveUserData(user);
      console.log(user);
      // Navigate to main app
      navigation.replace('StateSelections');
    } catch (err) {
      console.error('OTP verification failed:', err);
      let errorMessage = 'Invalid OTP. Please try again.';

      if (err.code === 'auth/invalid-verification-code') {
        errorMessage = 'Invalid verification code. Please check and try again.';
      } else if (err.code === 'auth/code-expired') {
        errorMessage = 'Verification code has expired. Please request a new one.';
      }

      setError(errorMessage);
      Alert.alert('Verification Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to your phone</Text>

      <View style={styles.otpContainer}>
        {code.map((digit, index) => (
          <TextInput
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

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { color: 'black',fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { color:'gray',fontSize: 14, color: '#777', marginBottom: 30, textAlign: 'center' },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  otpInput: {
    color: 'black',
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
  errorText: { color: '#FF5A5F', fontSize: 12, marginBottom: 10, textAlign: 'center' },
  button: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
