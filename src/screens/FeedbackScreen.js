import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FeedbackScreen({ navigation }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [experience, setExperience] = useState('');
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const submitFeedback = () => {
    if (!name || !mobile || !email || !feedback || !experience || rating === 0) {
      Alert.alert('Error', 'Please fill out all fields and provide a rating.');
      return;
    }

    
    setModalVisible(true);

    
    setName('');
    setMobile('');
    setEmail('');
    setFeedback('');
    setExperience('');
    setRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={28}
            color="#FFD700"
            style={{ marginHorizontal: 4 }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
        <Ionicons name="share-social-outline" size={22} />
      </View>

      {/* Form */}
        <TextInput
        placeholderTextColor='gray'
        placeholder="Type your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
        <TextInput
        placeholderTextColor='gray'
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        style={styles.input}
      />
        <TextInput
        placeholderTextColor='gray'
        placeholder="e-mail ID"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
        <TextInput
        placeholderTextColor='gray'
        placeholder="Write your Feedback"
        value={feedback}
        onChangeText={setFeedback}
        style={styles.input}
      />
        <TextInput
        placeholderTextColor='gray'
        placeholder="Please tell us your experience"
        value={experience}
        onChangeText={setExperience}
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 80 }]}
      />

      {/* Rating */}
      <Text style={styles.ratingLabel}>Rate us</Text>
      <View style={styles.starsRow}>{renderStars()}</View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitBtn} onPress={submitFeedback}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>

      {/* Popup */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Ionicons name="happy-outline" size={40} color="#2F6BFF" />
            <Text style={styles.thankText}>Thank You !!!</Text>
            <Text style={styles.feedbackNote}>For your feedback</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },

      input: {
    color:"black",
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },

  ratingLabel: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
  },

  submitBtn: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },
  thankText: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  feedbackNote: { fontSize: 14, marginTop: 4, marginBottom: 16 },
  okText: { fontSize: 16, color: '#2F6BFF', fontWeight: '600' },
});
