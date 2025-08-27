import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocationSearch({ navigation, route }) {
  const [news, setNews] = useState([]);
  const [locationList, setLocationList] = useState(['Hyderabad', 'Pune', 'Mumbai', 'Delhi']);

  const { title, coverImage, content, district } = route.params || {};

  useEffect(() => {
    loadNews();

  
    if (district && !locationList.includes(district)) {
      setLocationList(prev => [...prev, district]);
    }

    
    if (title && content && district) {
      const newNews = { title, coverImage, content, location: district };
      saveNews(newNews);
    }
  }, []);

  const loadNews = async () => {
    try {
      const storedNews = await AsyncStorage.getItem('NEWS');
      if (storedNews) setNews(JSON.parse(storedNews));
    } catch (error) {
      console.log('Error loading news:', error);
    }
  };

  const saveNews = async (newItem) => {
    try {
      const updatedNews = [...news, newItem];
      setNews(updatedNews);
      await AsyncStorage.setItem('NEWS', JSON.stringify(updatedNews));
    } catch (error) {
      console.log('Error saving news:', error);
    }
  };

  const filteredNews = (loc) =>
    news.filter((n) => n.location.toLowerCase() === loc.toLowerCase());

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {locationList.map((loc) => (
        <TouchableOpacity
          key={loc}
          style={styles.cityButton}
          onPress={() =>
            navigation.navigate('NewsList', { news: filteredNews(loc), location: loc })
          }
        >
          <Text style={styles.cityText}>{loc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cityButton: {
    padding: 15,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 6,
  },
  cityText: { fontWeight: 'bold', fontSize: 16 },
});
