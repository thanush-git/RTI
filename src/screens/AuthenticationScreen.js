import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false); //For changing Login button content


  // Validate Indian 10-digit phone number starting with 6-9
  const isValidPhone = (num) => /^[6-9]\d{9}$/.test(num);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Save token and user data locally
  const saveAuthData = async (token, user) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } catch (e) {
      console.error('Storage Error:', e);
    }
  };

  // Check if user exists in your backend
  const checkUserExists = async (phoneNumber) => {
    try {
      const response = await fetch(
        'https://reactspreadsheetnode-1.onrender.com/api/check-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: phoneNumber }),
        }
      );
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  };

  const handleLogin = async () => {
    if (!isValidPhone(phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
      return;
    }

    if (!agreed) {
      Alert.alert('Terms Required', 'Please accept the Terms & Conditions.');
      return;
    }

    try {
      setLoading(true);
      // Format phone number for Firebase (add +91 for India)
      const formattedPhone = `+91${phone}`;

      // Start Firebase phone authentication
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);

      // Check if user exists in your backend
      const userExists = await checkUserExists(phone);

      // Navigate to OTP screen with confirmation object and user existence info
      navigation.navigate('OTPScreen', {
        phone,
        confirmation,
        userExists
      });

    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert(
        'Login Failed',
        error?.message || 'Please try again later.'
      );
    }
  };

  // If user is already authenticated, navigate to main app
//  useEffect(() => {
//    if (user && !initializing) {
//      navigation.replace('FullNews');
//    }
//  }, [user, initializing]);

  if (initializing) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // If user is already logged in, don't show login screen
  if (user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>Signup to get Started</Text>

        <Text style={styles.label}>Mobile Number*</Text>
        <TextInput
          placeholderTextColor='gray'
          placeholder="Enter your mobile number"
          keyboardType="number-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgreed(!agreed)}
        >
          <Ionicons
            name={agreed ? 'checkbox' : 'square-outline'}
            size={22}
            color={agreed ? '#007bff' : '#aaa'}
          />
          <Text style={styles.checkboxLabel}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, loading && { backgroundColor: '#6b7280' }]}
       onPress={handleLogin}>
        <Text style={styles.buttonText}>{loading ? 'Sending OTP...' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 60,
    //justifyContent: 'space-between',
    paddingBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    color: "black",
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});