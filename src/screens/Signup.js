import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/firebase';

export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login successful:', user.email);
      navigation.replace('FullNews'); 
    } catch (error) {
      console.error('Login failed:', error.message);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello!</Text>
      <Text style={styles.subtitle}>Let’s get started</Text>

      <Text style={styles.label}>Email</Text>
        <TextInput
        placeholderTextColor='gray'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        placeholder="Enter your email"
      />

      <Text style={styles.label}>Password</Text>
        <TextInput
        placeholderTextColor='gray'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Enter your password"
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={rememberMe}
          onValueChange={setRememberMe}
          color={rememberMe ? '#2F6BFF' : undefined}
        />
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={20} color="#3b5998" />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
        {/* <View style={styles.loginRow}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.linkText}> Sign up</Text>
                </TouchableOpacity>
              </View> */}
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#2F6BFF', fontWeight: 'bold' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  hello: { fontSize: 32, fontWeight: 'bold', color: '#2F6BFF', marginTop: 40 },
  subtitle: { fontSize: 16, color: '#777', marginTop: 4, marginBottom: 24 },
  label: { fontSize: 14, color: '#555', marginBottom: 6 },
      input: {
    color:"black",
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: { marginLeft: 8, color: '#333' },
  forgotPassword: {
    color: '#2F6BFF',
    textAlign: 'right',
    marginBottom: 20,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  or: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#999',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  socialText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});
