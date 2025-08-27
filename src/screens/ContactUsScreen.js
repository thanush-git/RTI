import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ContactUsScreen() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = () => {
    Alert.alert('Thank you!', 'Your message has been submitted.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          source={{
            uri:
              'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.452181043032!2d77.5946!3d13.8277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb1e8dbed9c4c23%3A0x6ad1f88e278b6882!2sVasavi%20Dharmashala%2C%20Hindupur%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000',
          }}
          style={styles.map}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.label}>RTI EXPRESS STATE OFFICE</Text>
        <Text>#7-2-28, Near Indian Gas</Text>
        <Text>Vasavi Dharmashala Road</Text>
        <Text>Hindupur, Sri Sathya Sai District</Text>
        <Text>Andhra Pradesh – 515 201</Text>
        <Text style={styles.bold}>Contact: 76688 86666, 90596 79786</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:contact@rtiexpress.in')}>
          Email: contact@rtiexpress.in
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Send Us a Message</Text>
          <TextInput
        placeholderTextColor='gray'
          style={styles.input}
          placeholder="Your Name"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
          <TextInput
        placeholderTextColor='gray'
          style={styles.input}
          placeholder="Your Email"
          value={form.email}
          keyboardType="email-address"
          onChangeText={(text) => handleChange('email', text)}
        />
          <TextInput
        placeholderTextColor='gray'
          style={styles.input}
          placeholder="Subject"
          value={form.subject}
          onChangeText={(text) => handleChange('subject', text)}
        />
          <TextInput
        placeholderTextColor='gray'
          style={[styles.input, styles.textarea]}
          placeholder="Your Message..."
          multiline
          numberOfLines={5}
          value={form.message}
          onChangeText={(text) => handleChange('message', text)}
        />
        <Button title="Send Message" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  mapContainer: {
    height: 400,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  heading: {
    fontSize: 22,
    color: '#1877F2',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1877F2',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  link: {
    color: '#1877F2',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
      input: {
    color:"black",
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
