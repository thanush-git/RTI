import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CityScreen({ route }) {
  const { cityName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cityName}</Text>
      <Text style={styles.subtitle}>Welcome to {cityName}!</Text>
      {/* You can replace below with city-specific news, weather, etc. */}
      <Text style={styles.description}>
        This is a placeholder screen. You can now display information specific to {cityName}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  description: { fontSize: 16, textAlign: 'center', color: '#555' },
});
