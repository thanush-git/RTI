import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MediaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Ionicons name="menu" size={24} color="#2F6BFF" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="newspaper-outline" size={20} color="#2F6BFF" style={{ marginRight: 6 }} />
          <Text style={styles.logoText}>News2Day</Text>
        </View>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#2F6BFF" />
          </TouchableOpacity>
          <View style={{ width: 12 }} />
          <TouchableOpacity onPress={() => navigation.navigate('NNotifications')}>
            <Ionicons name="notifications-outline" size={20} color="#2F6BFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* News Card */}
      <View style={styles.card}>
        <Image
          source={require('../Assets/fish.png')} 
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>Marine Pollution</Text>
        <Text style={styles.content}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
          Velit officia consequat duis enim velit mollit. Exercitation veniam consequat
          sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor
          do amet sint. Velit officia consequat duis enim velit mollit.
        </Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomTab}>
        <TabIcon name="newspaper-o" label="News" onPress={() => navigation.navigate('NHomeScreen')} />
        <TabIcon name="image" label="Media" active />
        <TabIcon name="line-chart" label="Trending" onPress={() => navigation.navigate('Trending')} />
        <TabIcon name="graduation-cap" label="Career" onPress={() => navigation.navigate('Career')} />
        <TabIcon name="user" label="Profile" onPress={() => navigation.navigate('ProfilePreview')} />
      </View>
    </View>
  );
}

function TabIcon({ name, label, active, onPress }) {
  const color = active ? '#2F6BFF' : '#999';
  const fontAwesomeIcons = ['graduation-cap', 'line-chart', 'tv', 'image', 'user', 'newspaper-o'];
  let IconComponent = Ionicons;
  if (fontAwesomeIcons.includes(name)) {
    IconComponent = FontAwesome;
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      <IconComponent name={name} size={20} color={color} />
      <Text style={[styles.tabLabel, active && { color: '#2F6BFF' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoText: {
    fontSize: 20,
    color: '#2F6BFF',
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 12,
  },
  card: {
    margin: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    overflow: 'hidden',
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  content: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingTop: 8,
    color: '#444',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
