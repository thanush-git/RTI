import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Settings from './../../screens/Setting';

export default function Menu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('FillProfile')}
      >
        <Ionicons name="person-outline" size={20} color="#5956E9" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('LiveStatisticsScreen')}
      >
        <MaterialIcons name="live-tv" size={20} color="#5956E9" />
        <Text style={styles.menuText}>LIVE Statistics</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('VideosScreen')}
      >
        <Ionicons name="videocam-outline" size={20} color="#5956E9" />
        <Text style={styles.menuText}>Videos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('DiscoverScreen')}
      >
        <FontAwesome5 name="compass" size={18} color="#5956E9" />
        <Text style={styles.menuText}>Discover More</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Categories')}
      >
        <Ionicons name="apps-outline" size={20} color="#5956E9" />
        <Text style={styles.menuText}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Setting')}
      >
        <Ionicons name="settings-outline" size={20} color="#5956E9" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
