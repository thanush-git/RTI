import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { UserContext } from '../screens/UserContext'; 

const sources = [
  { name: 'BBC News', image: require('../Assets/Ellipse.png') },
  { name: 'CNN', image: require('../Assets/Ellipse.png') },
  { name: 'SCMP', image: require('../Assets/News Author (1).png') },
  { name: 'VICE', image: require('../Assets/News Author.png') },
  { name: 'ABP News', image: require('../Assets/Ellipse.png') },
  { name: 'India Today', image: require('../Assets/Ellipse.png') },
  { name: 'Fox News', image: { uri: 'https://s.yimg.com/fz/api/res/1.2/LXDW617DVhnHt0HIG9p6LQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0yMjg7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz00MDA-/https://s.yimg.com/am/60d/cba337b3856258f440a358598d209df6' } },
  { name: 'MSNBC', image: { uri: 'https://tse4.mm.bing.net/th/id/OIP.-78kYyX50Q8AaUEaSge7hwHaHa?pid=Api&P=0&h=180' } },
  { name: 'SCMP Online', image: { uri: 'https://images.unsplash.com/photo-1566877776426-141e601b4562' } },
  { name: 'Vice News', image: { uri: 'https://images.unsplash.com/photo-1566379073972-0f36e63eba33' } },
  { name: 'ABP Live', image: { uri: 'https://images.unsplash.com/photo-1585829365295-ab6cd7d73d87' } },
  { name: 'India TV', image: { uri: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e' } },
  { name: 'Reuters News', image: { uri: 'https://images.unsplash.com/photo-1567594321351-0a8e4d5e5d3a' } },
  { name: 'Associated Press', image: { uri: 'https://images.unsplash.com/photo-1572947650440-e57a4e79f2ec' } },
  { name: 'Al Jazeera English', image: { uri: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1' } },
  { name: 'New York Times', image: { uri: 'https://images.unsplash.com/photo-1566877776426-141e601b4562' } },
  { name: 'The Guardian UK', image: { uri: 'https://images.unsplash.com/photo-1566379073972-0f36e63eba33' } },
  { name: 'Washington Times', image: { uri: 'https://images.unsplash.com/photo-1585829365295-ab6cd7d73d87' } },
];


export default function NewsSourceScreen({ navigation }) {
  const [followedSources, setFollowedSources] = useState([]);
  const [search, setSearch] = useState('');
  const { incrementFollowing } = useContext(UserContext);

  const toggleFollow = (sourceName) => {
    setFollowedSources((prev) => {
      if (prev.includes(sourceName)) {
        return prev.filter((name) => name !== sourceName);
      } else {
        incrementFollowing();
        return [...prev, sourceName];
      }
    });
  };

  const filteredSources = sources.filter((src) =>
    src.name.toLowerCase().includes(search.toLowerCase())
  );

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 60) / 2; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your News Sources</Text>

   
      <View style={styles.searchBar}>
          <TextInput
        placeholderTextColor='gray'
          placeholder="Search News Sources"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <Ionicons name="search" size={22} color="#888" />
        </TouchableOpacity>
      </View>

     
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridContainer}>
        {filteredSources.map((item) => {
          const isFollowed = followedSources.includes(item.name);
          return (
            <View 
              key={item.name+1} 
              style={[styles.card, { width: cardWidth }]}
            >
              <Image source={item.image} style={styles.image} />
              <Text style={styles.sourceName}>{item.name}</Text>
              <TouchableOpacity
                style={[styles.follow, isFollowed && styles.following]}
                onPress={() => toggleFollow(item.name)}
              >
                <Text style={{ color: isFollowed ? '#fff' : '#000' }}>
                  {isFollowed ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('FullNews', {
            followedSources: followedSources,
          })
        }
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  searchBar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  image: { 
    width: 50, 
    height: 50, 
    marginBottom: 10 
  },
  sourceName: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'black'
  },
  follow: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  following: {
    backgroundColor: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
});