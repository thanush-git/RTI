import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LiveStatisticsScreen() {
  const navigation = useNavigation();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.liveTag}>LIVE</Text>
        <Text style={styles.headerText}>Statistics</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Cricket Scores */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cricket</Text>
          <Text style={styles.scoreText}>IND vs SA - 176/5 (20)</Text>
          <Text style={styles.scoreText}>PAK vs ENG - 140/7 (18)</Text>
          <TouchableOpacity onPress={() => openLink('https://www.espncricinfo.com')}>
            <Text style={styles.linkText}>Click to read NEWS in detail</Text>
          </TouchableOpacity>
        </View>

        {/* Football Scores */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Football</Text>
          <Text style={styles.scoreText}>Arsenal FC vs Real Madrid FC - 2:1</Text>
          <Text style={styles.scoreText}>Next Match: Tomorrow</Text>
          <TouchableOpacity onPress={() => openLink('https://www.goal.com')}>
            <Text style={styles.linkText}>Click to read NEWS in detail</Text>
          </TouchableOpacity>
        </View>

        {/* Market Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Market</Text>
          <Text style={styles.scoreText}>📈 NIFTY: 19,500 ▲ +1.23%</Text>
          <TouchableOpacity onPress={() => openLink('https://www.moneycontrol.com')}>
            <Text style={styles.linkText}>Click to read updated NEWS on Market</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#dc3545',
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },

  liveTag: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#ffc107',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 14,
  },

  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  scoreText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },

  linkText: {
    marginTop: 10,
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
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
