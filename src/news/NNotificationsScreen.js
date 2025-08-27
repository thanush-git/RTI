// TabIcon component for bottom tab bar
function TabIcon({ name, label, onPress, active }) {
  // Use FontAwesome for icons as per your usage in the tab bar
  const color = active ? '#1478FF' : '#888';
  return (
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
      <FontAwesome name={name} size={22} color={color} />
      <Text style={{ color, fontSize: 11, marginTop: 2 }}>{label}</Text>
    </TouchableOpacity>
  );
}
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const notifications = [
  {
    id: '1',
    title: 'Mumbai local train',
    subtitle: 'Local train services, considered as the lifeline 🚆',
    time: '2 hours ago',
    views: 96,
    status: 'LIVE',
  },
  {
    id: '2',
    title: 'Mumbai local train',
    subtitle: 'Local train services, considered as the lifeline 🚆',
    time: '3 hours ago',
    views: 82,
    status: 'HOT',
  },
  {
    id: '3',
    title: 'Mumbai local train',
    subtitle: 'Local train services, considered as the lifeline 🚆',
    time: '4 hours ago',
    views: 74,
    status: 'HOT',
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={require('../Assets/train.png')} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}><Ionicons name="eye-outline" size={14} /> {item.views}</Text>
          <Text style={styles.meta}>🕓 {item.time}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={[styles.statusTag, item.status === 'LIVE' ? styles.live : styles.hot]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="newspaper-outline" size={20} color="#2F6BFF" style={{ marginRight: 6 }} />
          <Text style={styles.logoText}>News2Day</Text>
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

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#aaa" style={{ marginRight: 8 }} />
          <TextInput
        placeholderTextColor='gray' placeholder="Search News" style={styles.searchInput} />
      </View>

      <Text style={styles.sectionTitle}>Notifications</Text>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Tabs */}
      {/* <View style={styles.tabBar}>
        <Tab icon="newspaper-outline" label="News" />
        <Tab icon="videocam-outline" label="Media" />
        <Tab icon="flame-outline" label="Trending" />
        <Tab icon="briefcase-outline" label="Career" />
        <Tab icon="person-outline" label="Profile" />
      </View>
    </View> */}

    <View style={styles.tabBar}>
            <TabIcon name="newspaper-o" label="News" onPress={() => navigation.navigate('NHomeScreen')} />
            <TabIcon name="image" label="Media" active />
            <TabIcon name="line-chart" label="Trending" onPress={() => navigation.navigate('Trending')} />
            <TabIcon name="briefcase" label="Career" onPress={() => navigation.navigate('Career')} />
            <TabIcon name="user" label="Profile" onPress={() => navigation.navigate('ProfilePreview')} />
          </View>
        </View>
  );
}

const Tab = ({ icon, label }) => (
  <TouchableOpacity style={styles.tabItem}>
    <Ionicons name={icon} size={22} color="#333" />
    <Text style={styles.tabLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 18,
    color: '#2F6BFF',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  subtitle: {
    color: '#555',
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 12,
  },
  meta: {
    fontSize: 11,
    color: '#888',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  statusTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  live: {
    backgroundColor: '#2ecc71',
  },
  hot: {
    backgroundColor: '#e74c3c',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  shareBtn: {
    marginTop: 8,
  },
  shareText: {
    fontSize: 11,
    color: '#2F6BFF',
    fontWeight: 'bold',
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: '#333',
    marginTop: 2,
  },
});
