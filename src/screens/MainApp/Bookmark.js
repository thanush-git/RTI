import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const bookmarks = [
  {
    id: '1',
    category: 'Europe',
    title: "Ukraine's President Zelensky to BBC: Blood money being paid...",
    source: 'BBC News',
    time: '14m ago',
    image: 'train.png',
  },
  {
    id: '2',
    category: 'Travel',
    title: 'Her train broke down. Her phone died. And then she met her...',
    source: 'CNN',
    time: '1h ago',
    image: 'https://via.placeholder.com/60x60.png?text=2',
  },
  {
    id: '3',
    category: 'Europe',
    title: 'Russian warship: Moskva sinks in Black Sea',
    source: 'BBC News',
    time: '4h ago',
    image: 'https://via.placeholder.com/60x60.png?text=3',
  },
  {
    id: '4',
    category: 'Money',
    title: 'Wind power produced more electricity than coal and nuc...',
    source: 'USA Today',
    time: '4h ago',
    image: 'https://via.placeholder.com/60x60.png?text=4',
  },
  {
    id: '5',
    category: 'Life',
    title: "'We keep rising to new challenges:' For churches hit...",
    source: 'USA Today',
    time: '4h ago',
    image: 'https://via.placeholder.com/60x60.png?text=5',
  },
];

export default function BookmarkScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.newsItem}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <View style={styles.newsContent}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <View style={styles.row}>
          <Text style={styles.source}>{item.source}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmark</Text>

      {/* Search bar */}
      <View style={styles.searchRow}>
          <TextInput
        placeholderTextColor='gray'
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Ionicons name="options-outline" size={22} color="#444" />
        </TouchableOpacity>
      </View>

      {/* News List */}
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate('NHomeScreen')} style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Categories')} style={styles.tabItem}>
          <Ionicons name="search-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <View style={styles.activeCircle}>
            {/* <Text style={{ color: 'white', fontWeight: 'bold' }}>S</Text> */}
          <Ionicons name="bookmark" size={24} color="#b5b4b4ff" />

          </View>
          <Text style={[styles.tabLabel, { color: '#aaa' }]}>Bookmark</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfilePreview')} style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  category: {
    color: '#999',
    fontSize: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  source: {
    color: '#666',
    fontSize: 12,
  },
  dot: {
    marginHorizontal: 4,
    fontSize: 12,
    color: '#888',
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
  activeTab: {
    alignItems: 'center',
  },
  activeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#5956E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
});
