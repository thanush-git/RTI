import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Menu, Logo, Chat, Notification */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="newspaper-outline" size={20} color="#2F6BFF" style={{ marginRight: 6 }} />
          <Text style={styles.logo}>News2Day</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('NNotifications')}>
            <Ionicons name="notifications-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* News Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('NHomeScreen')}>
          <Image
            source={require('../Assets/newshom.png')} 
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>3 Health Benefits</Text>
          <Text style={styles.cardSnippet}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.lamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.bottomTab}>

        <TouchableOpacity onPress={() => navigation.navigate('NStartScreen')} style={styles.tabItem}>
          <Ionicons name="newspaper-outline" size={24} color="#5956E9" />
          <Text style={styles.tabLabel}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MediaScreen')} style={styles.tabItem}>
          <Ionicons name="videocam" size={22} color="#aaa" />
          <Text style={styles.tabLabel}>Media</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Trending')} style={styles.tabItem}>
          <Ionicons name="flame" size={22} color="#aaa" />
          <Text style={styles.tabLabel}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Career')} style={styles.tabItem}>
          <FontAwesome name="graduation-cap" size={22} color="#aaa" />
          <Text style={styles.tabLabel}>Career</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TechScreen')} style={styles.tabItem}>
          <FontAwesome name="tv" size={22} color="#aaa" />
          <Text style={styles.tabLabel}>Tech</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F6BFF',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 12,
    color: '#333',
  },
  cardSnippet: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 12,
    marginBottom: 12,
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
    color: '#666',
    marginTop: 2,
  },
});
