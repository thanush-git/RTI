import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Image, Alert, Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

const ActivistForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    DOB: null,
    gender: '',
    phone: '',
    email: '',
    address: '',
    aadhar: '',
    designation: '',
    pincode: '',
    experience: '',
    media: null,
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODkyYWJhZjhmOGJiZjRhM2ZlYWZjYzMiLCJpYXQiOjE3NTQ0NDI2NzF9.1CsPgPuvQT-noWcNZueq1vEaQGraDOZRuOWhPP-pM_U";

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      'name', 'DOB', 'gender', 'phone',
      'email', 'address', 'aadhar',
      'designation', 'pincode',
    ];
    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = 'Required';
    });
    // Experience can be optional here as per image
    if (!formData.media) newErrors.media = 'Photo required';
    if (!formData.agreed) newErrors.agreed = 'You must agree to continue';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your gallery to upload a photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setFormData({ ...formData, media: result.assets[0] });
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'media') {
          dataToSend.append('media', {
            uri: Platform.OS === 'ios' ? formData.media.uri.replace('file://', '') : formData.media.uri,
            name: formData.media.fileName || 'image.jpg',
            type: formData.media.type || 'image/jpeg',
          });
        } else if (key === 'DOB') {
          dataToSend.append('DOB', formData.DOB.toISOString());
        } else if (key !== 'agreed') {
          dataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('http://34.100.231.173:3000/api/v1/activist/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        body: dataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Activist Form Submitted!');
        navigation.navigate('PublishNewsScreen');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Network Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Activist Form</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {formData.media ? (
          <Image source={{ uri: formData.media.uri }} style={styles.imagePreview} />
        ) : (
          <Ionicons name="camera" size={30} color="#ccc" />
        )}
      </TouchableOpacity>
      {errors.media && <Text style={styles.error}>{errors.media}</Text>}

      <Text style={styles.label}>Full Name*</Text>
        <TextInput
        placeholderTextColor='gray'
        placeholder="Wilson Franci"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        style={styles.input}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <Text style={styles.label}>Date of Birth*</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: formData.DOB ? '#000' : '#999' }}>
          {formData.DOB ? formData.DOB.toDateString() : 'DD/MM/YYYY'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={formData.DOB || new Date()}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setFormData({ ...formData, DOB: selectedDate });
            }
          }}
        />
      )}
      {errors.DOB && <Text style={styles.error}>{errors.DOB}</Text>}

      <Text style={styles.label}>Gender*</Text>
      <RNPickerSelect
        onValueChange={(value) => setFormData({ ...formData, gender: value })}
        placeholder={{ label: 'Select Gender', value: '' }}
        value={formData.gender}
        items={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => <Ionicons name="chevron-down" size={20} color="gray" />}
      />
      {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

      <Text style={styles.label}>Phone Number*</Text>
        <TextInput
        placeholderTextColor='gray'
        placeholder="+91 98765 43210"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        style={styles.input}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <Text style={styles.label}>Email Address*</Text>
        <TextInput
        placeholderTextColor='gray'
        placeholder="example@youremail.com"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <Text style={styles.label}>Address*</Text>
        <TextInput
        placeholderTextColor='gray'
        placeholder="D.No 1/1/1234, Area Name, District, State"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        style={styles.input}
      />
      {errors.address && <Text style={styles.error}>{errors.address}</Text>}

      <Text style={styles.label}>Aadhar Number*</Text>
        <TextInput
        placeholderTextColor='gray'
        placeholder="1111-2222-3333"
        value={formData.aadhar}
        maxLength={12}
        onChangeText={(text) => setFormData({ ...formData, aadhar: text })}
        style={styles.input}
      />
      {errors.aadhar && <Text style={styles.error}>{errors.aadhar}</Text>}

      <Text style={styles.label}>Designation (District)*</Text>
      <RNPickerSelect
        onValueChange={(value) => setFormData({ ...formData, designation: value })}
        placeholder={{ label: 'Select District', value: '' }}
        value={formData.designation}
        items={[
          { label: 'Anantapur', value: 'Anantapur' },
          { label: 'Kurnool', value: 'Kurnool' },
          { label: 'Guntur', value: 'Guntur' },
          { label: 'Kadapa', value: 'Kadapa' },
          { label: 'Vijayawada', value: 'Vijayawada' },
        ]}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => <Ionicons name="chevron-down" size={20} color="gray" />}
      />
      {errors.designation && <Text style={styles.error}>{errors.designation}</Text>}

      <Text style={styles.label}>Pincode*</Text>
        <TextInput
        placeholderTextColor='gray'
        placeholder="515 201"
        value={formData.pincode}
        onChangeText={(text) => setFormData({ ...formData, pincode: text })}
        style={styles.input}
      />
      {errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}

      <Text style={styles.label}>Experience in Years (if any)</Text>
        <TextInput
        placeholderTextColor='gray'
        placeholder="1 Year"
        value={formData.experience}
        onChangeText={(text) => setFormData({ ...formData, experience: text })}
        style={styles.input}
      />
      {/* Experience is optional so no error */}

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setFormData({ ...formData, agreed: !formData.agreed })}
        >
          {formData.agreed && <Ionicons name="checkmark" size={18} color="#0077B6" />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Terms & Conditions</Text>
      </View>
      {errors.agreed && <Text style={styles.error}>{errors.agreed}</Text>}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text>Already registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ALoginScreen')}>
          <Text style={{ color: '#0077B6', fontWeight: 'bold', marginTop: 5 }}>Login here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ActivistForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0077B6',
    textAlign: 'center',
    marginBottom: 20,
  },
      input: {
    color:"black",
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  imagePicker: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    height: 150,
    justifyContent: 'center',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#0077B6',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    height: 22,
    width: 22,
    borderWidth: 1,
    borderColor: '#0077B6',
    borderRadius: 3,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    color: 'black',
    marginBottom: 10,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    color: 'black',
    marginBottom: 10,
    paddingRight: 30,
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
});
