import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Replace with your image */}
      <Image
        source={require('../Assets/success.png')} // ← Add your image in assets
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Success!</Text>
      <Text style={styles.subtitle}>
        Your password has been reset successfully.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('FullNews')}
      >
        <Text style={styles.buttonText}>Go to Home Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  image: { width: 180, height: 180, marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2F6BFF', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },

  button: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
