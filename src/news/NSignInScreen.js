

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../config/firebase';

export default function NSignInScreen() {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');

  const validateInput = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleLogin = async () => {
    if (!validateInput()) {
      Alert.alert('Invalid input', 'Enter a valid email or 10-digit mobile number');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Invalid password', 'Password must be at least 4 characters');
      return;
    }

  
    if (/^\S+@\S+\.\S+$/.test(input)) {
      try {
        await signInWithEmailAndPassword(auth, input, password);
        navigation.replace('NHomeScreen'); 
      } catch (error) {
        Alert.alert('Login Failed', error.message);
      }
    } else {
      Alert.alert('Unsupported Login', 'Only email login is supported at this time');
    }
  };

//   return (
//     <View style={styles.container}>
//       {/* ... (unchanged code) */}
//     </View>
//   );
// }

// const styles = StyleSheet.create(
  // ... (unchanged styles)


  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require('../Assets/LOGO.png')} 
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Text style={styles.logoText}>News2Day</Text>

        <TextInput
        placeholderTextColor='gray'
        placeholder="Phone / email"
        style={styles.input}
        value={input}
        onChangeText={setInput}
        keyboardType="default"
      />
        <TextInput
        placeholderTextColor='gray'
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Sign in with</Text>

      <View style={styles.socialRow}>
        <FontAwesome name="apple" size={28} color="#000" style={styles.icon} />
        <FontAwesome name="facebook" size={28} color="#3b5998" style={styles.icon} />
        <FontAwesome name="google" size={28} color="#DB4437" style={styles.icon} />
      </View>

      <View style={styles.bottomRow}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NSignUpScreen')}>
          <Text style={styles.linkText}> Sign up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.replace('NHomeScreen')}>
        <Text style={styles.guestText}>Skip & Login as Guest ➔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2F6BFF',
    marginBottom: 40,
  },
      input: {
    color:"black",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  forgotText: {
    textAlign: 'right',
    color: '#2F6BFF',
    marginBottom: 16,
  },
  loginBtn: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    marginHorizontal: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  linkText: {
    color: '#2F6BFF',
    fontWeight: '600',
  },
  guestText: {
    textAlign: 'center',
    color: '#2F6BFF',
    fontWeight: '500',
  },
});
