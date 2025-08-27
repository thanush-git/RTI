import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = [
  { icon: 'film', label: 'Bollywood', iconSet: 'FontAwesome5' },
  { icon: 'building', label: 'Business', iconSet: 'FontAwesome5' },
  { icon: 'landmark', label: 'National', iconSet: 'FontAwesome5' },
  { icon: 'heartbeat', label: 'Health', iconSet: 'FontAwesome5' },
  { icon: 'globe-americas', label: 'World', iconSet: 'FontAwesome5' },
  { icon: 'theater-masks', label: 'Art & Culture', iconSet: 'FontAwesome5' },
  { icon: 'music', label: 'Entertainment', iconSet: 'FontAwesome5' },
  { icon: 'chart-line', label: 'Trending', iconSet: 'FontAwesome5' },
  { icon: 'book', label: 'GK', iconSet: 'FontAwesome5' },
  { icon: 'newspaper-outline', label: 'NewsToday', iconSet: 'Ionicons' },
  { icon: 'laptop-code', label: 'Tech', iconSet: 'FontAwesome5' },
  { icon: 'gamepad', label: 'Gaming', iconSet: 'FontAwesome5' },
  { icon: 'camera', label: 'Photography', iconSet: 'FontAwesome5' },
  { icon: 'plane', label: 'Travel', iconSet: 'FontAwesome5' },
  { icon: 'utensils', label: 'Food', iconSet: 'FontAwesome5' },
  { icon: 'heart', label: 'Lifestyle', iconSet: 'FontAwesome5' },
  { icon: 'users', label: 'Community', iconSet: 'FontAwesome5' },
  { icon: 'graduation-cap', label: 'Education', iconSet: 'FontAwesome5' },
  { icon: 'briefcase', label: 'Career', iconSet: 'FontAwesome5' },
  { icon: 'mobile-alt', label: 'Mobile', iconSet: 'FontAwesome5' },
  { icon: 'tv', label: 'Television', iconSet: 'FontAwesome5' },
];

export default function Categories() {
  const navigation = useNavigation();

  // Function to render the appropriate icon
  const renderIcon = (iconSet, iconName) => {
    if (iconSet === 'Ionicons') {
      return <Ionicons name={iconName} size={24} color="#000" />;
    } else {
      return <FontAwesome5 name={iconName} size={24} color="#000" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Categories</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((cat, index) => {
          const isNewsToday = cat.label === 'NewsToday';
          const isEducation = cat.label === 'Education';
          
          let onPress;
          if (isNewsToday) {
            onPress = () => navigation.navigate('NStartScreen');
          } else if (isEducation) {
            onPress = () => navigation.navigate('Bookmark');
          }
          
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={onPress}
            >
              {renderIcon(cat.iconSet, cat.icon)}
              <Text style={styles.label}>{cat.label}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate('NStartScreen')} style={styles.tabItem}>
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
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
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
    paddingBottom: 80,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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