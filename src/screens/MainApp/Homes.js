

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    // Automatically navigate to FullNews when Home is opened
    navigation.replace('FullNews'); // or navigation.navigate('FullNews');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2F6BFF" />
    </View>
  );
}
