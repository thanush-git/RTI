

import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FillProfile({ navigation }) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODkyZTAwNmY2YmM3ZGYyMWFkYmEwYjkiLCJpYXQiOjE3NTQ0NTYwNzB9.aE3nuOHI1ZbFKOVtRdTRW0-84jXhTYqYIP_eL1ENTx0";
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  
  const handleNext = async () => {
    if (!email || !phone) {
      Alert.alert('Error', 'Email and Phone Number are required.');
      return;
    }

    try {
      const response = await fetch(
        'http://34.100.231.173:3000/api/v1/profile/updateprofile',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName: username,
            fullName: fullName,
            email: email,
            phone: Number(phone),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        Alert.alert('Error', errorData.message || 'Failed to update profile');
        return;
      }

      const data = await response.json();
      console.log('Profile updated:', data);

  
      navigation.navigate('ProfilePreview', {
        image,
        username,
        fullName,
        email,
        phone,
      });
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fill your Profile</Text>

      {/* Upload circle */}
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderCircle}>
            <Feather name="camera" size={28} color="#888" />
          </View>
        )}
      </TouchableOpacity>

      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        icon="person-outline"
      />
      <Input
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        icon="person"
      />
      <Input
        label="Email Address*"
        value={email}
        onChangeText={setEmail}
        icon="mail-outline"
      />
      <Input
        label="Phone Number*"
        value={phone}
        onChangeText={setPhone}
        icon="call-outline"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextBtnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

function Input({ label, value, onChangeText, icon, keyboardType = 'default' }) {
  return (
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={20} color="#888" style={styles.icon} />
        <TextInput
        placeholderTextColor='gray'
        placeholder={label}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, alignSelf: 'center' },
  imageContainer: { alignSelf: 'center', marginBottom: 30 },
  placeholderCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    elevation: 1,
  },
  icon: { marginRight: 10 },
      input: {
    color:"black", flex: 1, fontSize: 16 },
  nextBtn: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
