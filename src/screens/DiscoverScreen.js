import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DiscoverScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Discover</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionBox}>
          <MaterialIcons name="emoji-events" size={30} color="#007bff" />
          <Text style={styles.optionText}>Contests</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBox}>
          <Ionicons name="clipboard-outline" size={30} color="#28a745" />
          <Text style={styles.optionText}>Surveys</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBox}>
          <Ionicons name="newspaper-outline" size={30} color="#ff6347" />
          <Text style={styles.optionText}>Briefs</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate('NHomeScreen')} style={styles.tabItem}>
          <Ionicons name="newspaper-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>News</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MediaScreen')} style={styles.tabItem}>
          <Ionicons name="image-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Media</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Trending')} style={styles.tabItem}>
          <Ionicons name="flame-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Trending</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Career')} style={styles.tabItem}>
          <Ionicons name="briefcase-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Career</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TechScreen')} style={styles.tabItem}>
          <Ionicons name="hardware-chip-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Tech</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 16,
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionBox: {
    width: '80%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },

  optionText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  tabItem: {
    alignItems: 'center',
  },

  tabLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
});
