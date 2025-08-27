import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile({ route, navigation }) {
  const {
    username = '',
    fullName = '',
    email = '',
    phone = '',
    bio = '',
    website = '',
    image = null,
  } = route.params || {};

  const [profileImage, setProfileImage] = useState(image);
  const [usernameValue, setUsername] = useState(username);
  const [nameValue, setFullName] = useState(fullName);
  const [emailValue, setEmail] = useState(email);
  const [phoneValue, setPhone] = useState(phone);
  const [bioValue, setBio] = useState(bio);
  const [websiteValue, setWebsite] = useState(website);
  const [errors, setErrors] = useState({});

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\-\+\s]{10,15}$/;

    if (!emailRegex.test(emailValue)) {
      newErrors.email = 'Invalid email address';
    }

    if (!phoneRegex.test(phoneValue)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const normalizeWebsite = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
  };

  const handleSave = () => {
    if (!validate()) return;

    const updatedData = {
      username: usernameValue,
      fullName: nameValue,
      email: emailValue,
      phone: phoneValue,
      bio: bioValue,
      website: normalizeWebsite(websiteValue),
      image: profileImage,
      followers: route.params?.followers || 0,
      following: route.params?.following || 0,
    };

    navigation.navigate('ProfilePreview', updatedData);
    navigation.navigate('Settings', {
      username: usernameValue,
      image: profileImage,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={26} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Ionicons name="checkmark" size={26} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Image */}
        <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Feather name="camera" size={24} color="#888" />
            </View>
          )}
          <View style={styles.editIcon}>
            <Feather name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
          {/* Username */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Username</Text>
              <TextInput
        placeholderTextColor='gray'
              style={styles.inputBox}
              value={usernameValue}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor="#888"
            />
          </View>

          {/* Full Name */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
        placeholderTextColor='gray'
              style={styles.inputBox}
              value={nameValue}
              onChangeText={setFullName}
              placeholder="Enter full name"
              placeholderTextColor="#888"
            />
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email Address*</Text>
              <TextInput
        placeholderTextColor='gray'
              style={styles.inputBox}
              value={emailValue}
              onChangeText={setEmail}
              placeholder="example@youremail.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </View>

          {/* Phone */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone Number*</Text>
              <TextInput
        placeholderTextColor='gray'
              style={styles.inputBox}
              value={phoneValue}
              onChangeText={setPhone}
              placeholder="+91-00000-00000"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
          </View>

          {/* Bio */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
        placeholderTextColor='gray'
              style={[styles.inputBox, { height: 80 }]}
              value={bioValue}
              onChangeText={setBio}
              placeholder="Tell us about yourself"
              placeholderTextColor="#888"
              multiline
            />
          </View>

          {/* Website */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Website</Text>
              <TextInput
        placeholderTextColor='gray'
              style={styles.inputBox}
              value={websiteValue}
              onChangeText={setWebsite}
              placeholder="https://yourwebsite.com"
              placeholderTextColor="#888"
              autoCapitalize="none"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: '600' },
  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5956E9',
    borderRadius: 12,
    padding: 5,
  },
  form: {
    marginTop: 10,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
