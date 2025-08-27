import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { UserContext } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfilePreview({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userData, userPosts } = useContext(UserContext);

  const [profile, setProfile] = useState({
    image: null,
    username: '',
    fullName: '',
    email: '',
    phone: '',
    website: '',
    bio: 'Write about you...',
    followers: 0,
    following: 0,
  });

  const [activeTab, setActiveTab] = useState('Pending');
  const [hasPendingContent, setHasPendingContent] = useState(false);
  const [hasApprovedContent, setHasApprovedContent] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtRTIToken");
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        return;
      }

      const res = await fetch('http://api.rtiexpress.in/api/v1/profile/fetchprofile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error('API Error:', errData);
        Alert.alert('Error', errData.message || 'Failed to fetch profile');
        return;
      }

      const data = await res.json();
      console.log('Fetched profile:', data);

      if (data.user) {
        setProfile((prev) => ({
          ...prev,
          username: data.user.userName || '',
          fullName: data.user.fullName || '',
          email: data.user.email || '',
          phone: data.user.phone ? String(data.user.phone) : '',
        }));
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Error', 'Unable to fetch profile. Please try again.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setProfile((prev) => ({ ...prev, ...route.params }));
      } else if (userData) {
        setProfile((prev) => ({ ...prev, ...userData }));
      }
      fetchProfile();
    }
  }, [isFocused, route.params, userData]);

  useEffect(() => {
    // Check if tabs have content
    setHasPendingContent(userPosts && userPosts.length > 0);
    setHasApprovedContent(recentNews && recentNews.length > 0);
  }, [userPosts]);

  const myPosts = userPosts || [];

  const recentNews = [
    {
      id: '1',
      category: 'NFTs',
      title: 'Minting Your First NFT: A Beginner’s Guide',
      author: profile.fullName,
      time: '15m ago',
      image: 'https://ctnft.net/static/site/images/nft/mining-eth/NFT_1M_20K_1000px.png',
    },
    {
      id: '2',
      category: 'Business',
      title: '5 Things to Know Before the Stock Market Opens',
      author: profile.fullName,
      time: '1h ago',
      image: 'https://up.yimg.com/ib/th/id/OIP.rlrCRGKOu2_SJgSsi2tViQHaEK?pid=Api&rs=1&c=1&qlt=95&w=182&h=102',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.newsCard}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.newsCategory}>{item.category}</Text>
        <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.newsMeta}>{item.author} • {item.time}</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="document-text-outline" size={50} color="#ccc" />
      <Text style={styles.emptyStateText}>Nothing here yet</Text>
    </View>
  );

  const handleTabPress = (tabName) => {
    // Always allow switching tabs regardless of content
    setActiveTab(tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting', { ...profile })}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image
            source={profile.image ? { uri: profile.image } : require('../Assets/image1.png')}
            style={styles.profilePic}
          />
          <Text style={styles.name}>{profile.fullName || 'Your Name'}</Text>
        </View>
        
        <View style={styles.stats}>
          <View style={styles.statsData}>
            <Text style={styles.count}>{profile.followers}</Text>
            <Text style={styles.statsLabel}>Followers</Text>
          </View>
          <View style={styles.statsData}>
            <Text style={styles.count}>{profile.following}</Text>
            <Text style={styles.statsLabel}>Following</Text>
          </View>
          <TouchableOpacity 
            style={styles.statsData}
            onPress={() => handleTabPress('Pending')}
          >
            <Text style={styles.count}>{myPosts.length}</Text>
            <Text style={styles.statsLabel}>News</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileBottom}>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('EditProfile', { ...profile })}
          >
            <Ionicons name="create-outline" size={18} color="#333" style={styles.btnIcon} />
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Bookmark', { ...profile })}
          >
            <Ionicons name="bookmark-outline" size={18} color="#333" style={styles.btnIcon} />
            <Text style={styles.btnText}>Bookmarks</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabRow}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Pending' && styles.tabButtonActive]}
          onPress={() => handleTabPress('Pending')}
        >
          <Text style={[styles.tabText, activeTab === 'Pending' && styles.tabTextActive]}>
            Pending {hasPendingContent ? `(${myPosts.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Approved' && styles.tabButtonActive]}
          onPress={() => handleTabPress('Approved')}
        >
          <Text style={[styles.tabText, activeTab === 'Approved' && styles.tabTextActive]}>
            Approved {hasApprovedContent ? `(${recentNews.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Approved' && (
        <FlatList
          data={recentNews}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {activeTab === 'Pending' && (
        <FlatList
          data={[...myPosts].reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('FullNews')} style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('JoinRTIScreen')} style={styles.tabItem}>
          <Ionicons name="create-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Join RTI</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddPostScreen')} style={styles.tabItem}>
          <Ionicons name="add-circle" size={28} color="#aaa" />
          <Text style={styles.tabLabel}>Add Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EpaperScreen')} style={styles.tabItem}>
          <Ionicons name="book-outline" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>E-Paper</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePreview')} style={styles.tabItem}>
          <Ionicons name="person" size={24} color="#007bff" />
          <Text style={[styles.tabLabel, { color: '#007bff' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  topBar: {
    padding: 20,
   
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileTitle: { 
    fontSize: 18, 
    fontWeight: '600',
    color: '#000',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  profilePic: { 
    width: 80, 
    height: 80, 
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  name: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: "60%",
    marginLeft: "10%"
  },
  statsData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  profileBottom: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  count: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#000',
  },
  btnRow: { 
    flexDirection: 'row', 
    gap: 10,
    width: '100%',
  },
  btn: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnIcon: {
    marginRight: 6,
  },
  btnText: { 
    color: '#333', 
    fontWeight: '500',
    fontSize: 14,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#f0f8ff',
  },
  tabText: {
    fontSize: 14, 
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  listContainer: { 
    paddingHorizontal: 20,
    paddingBottom: 80,
    flexGrow: 1,
  },
  newsCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newsImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  newsCategory: { 
    fontSize: 12, 
    color: '#888',
    fontWeight: '500',
  },
  newsTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginVertical: 4,
    color: '#333',
  },
  newsMeta: { 
    fontSize: 12, 
    color: '#555' 
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
});