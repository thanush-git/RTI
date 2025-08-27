import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

//const db = getFirestore();

export default function NSignUpScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreePolicy, setAgreePolicy] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !phone || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(phone)) {
      Alert.alert('Invalid Phone', 'Phone number must be 10 digits.');
      return;
    }

    if (!agreePolicy) {
      Alert.alert('Privacy Policy', 'You must agree to the privacy policy.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ User created:', user.email);

      try {
        await setDoc(doc(db, 'users', user.uid), {
          fullName,
          email,
          phone,
          createdAt: new Date().toISOString(),
        });
        console.log('✅ User info saved in Firestore');
      } catch (firestoreError) {
        console.error('⚠️ Firestore save failed:', firestoreError.message);
      }

      console.log('🚀 Navigating to NHomeScreen');
      navigation.replace('NHomeScreen');
    } catch (error) {
      console.error('❌ Signup error:', error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Signup Failed', 'This email is already registered. Try logging in.');
      } else {
        Alert.alert('Signup Failed', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

        <TextInput
        placeholderTextColor='gray'
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

        <TextInput
        placeholderTextColor='gray'
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

        <TextInput
        placeholderTextColor='gray'
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

        <TextInput
        placeholderTextColor='gray'
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={agreePolicy}
          onValueChange={setAgreePolicy}
          color={agreePolicy ? '#2F6BFF' : undefined}
        />
        <Text style={styles.checkboxLabel}>
          I agree to the Privacy Policy
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('NHomeScreen')}>
  <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>
    🔁 Test Navigate to Home
  </Text>
</TouchableOpacity>


      <Text style={styles.orText}>Or sign up with</Text>

      <View style={styles.socialRow}>
        <FontAwesome name="apple" size={28} color="#000" style={styles.icon} />
        <FontAwesome name="facebook" size={28} color="#3b5998" style={styles.icon} />
        <FontAwesome name="google" size={28} color="#DB4437" style={styles.icon} />
      </View>

      <View style={styles.loginRow}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NSignInScreen')}>
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 32, fontWeight: 'bold', color: '#2F6BFF', marginBottom: 24, textAlign: 'center' },
      input: {
    color:"black",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLink: {
    color: '#2F6BFF',
    fontWeight: '600',
  },
});
