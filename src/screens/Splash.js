import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function Splash({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding'), 1500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* TODO: replace with your logo path */}
      <Image source={require('../Assets/RTIExpress1.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.footer}>Developed by krishlabs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 180, height: 180 },
  footer: { position: 'absolute', bottom: 24, color: '#000', fontSize: 12 },
});
