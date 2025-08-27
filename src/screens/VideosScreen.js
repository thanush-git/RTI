import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const videoData = new Array(8).fill({
  thumbnail: 'https://img.icons8.com/ios-filled/100/play-button-circled.png',
  title: 'Video title here',
});

export default function VideosScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Videos</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Grid of Videos */}
      <ScrollView contentContainerStyle={styles.grid}>
        {videoData.map((video, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.label}>{video.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate('NHomeScreen')} style={styles.tabItem}>
          <Ionicons name="newspaper-outline" size={24} color="#5956E9" />
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

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },

  card: {
    width: '47%',
    aspectRatio: 1,
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    padding: 10,
  },

  thumbnail: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },

  label: {
    textAlign: 'center',
    fontSize: 12,
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
