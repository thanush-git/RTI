import React, { useState, useEffect, useRef } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

// Individual Full-Screen News Item with dynamic follow logic
const FullScreenNewsItem = ({ item, followingList, onFollowToggle, currentUserId }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if current user is following this news author
  const isFollowing = followingList.some(followedUser =>
    followedUser._id === item.userId._id
  );

  // Don't show follow button if it's the current user's own post
  const isOwnPost = currentUserId === item.userId._id;

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image
        source={{ uri: item.media }}
        style={styles.headerImage}
      />

      {/* Top Icons */}
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="location-outline" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="notifications-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Card */}
      <ScrollView style={styles.card} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.headline}</Text>
          <TouchableOpacity>
            <Feather name="share" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Author Row */}
        <View style={styles.authorContainer}>
          {/* Avatar */}
          <Image
            source={{ uri: item.media }}
            style={styles.avatar}
          />

          {/* Author Details */}
          <View style={styles.authorDetails}>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>
                {item.userId.name || item.userId.fullName || 'Unknown Author'}
              </Text>
              <Text style={styles.authorDate}>{formatDate(item.createdAt)}</Text>
            </View>

            {/* Show appropriate button based on post ownership */}
            {isOwnPost ? (
              <TouchableOpacity
                style={[
                  styles.followPill,
                  { backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ddd' }
                ]}
                disabled={true}
              >
                <Text style={[styles.followText, { color: '#666' }]}>
                  You
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.followPill,
                  !isFollowing && { backgroundColor: '#fff', borderWidth: 1, borderColor: '#007AFF' },
                ]}
                onPress={() => onFollowToggle(item.userId._id, isFollowing)}
              >
                <Text style={[styles.followText, !isFollowing && { color: '#007AFF' }]}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {item.description}
        </Text>
      </ScrollView>
    </View>
  );
};

export default function FullNews() {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const flatListRef = useRef(null);

  // Fetch current user's following list
  const fetchFollowingList = async (userId) => {
    try {
      const token = await AsyncStorage.getItem("JWTRTIToken");
      if (!token) {
        console.error('No token found');
        return [];
      }

      const response = await fetch(`http://api.rtiexpress.in/v1/user/following/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Following API Response:', data);

      if (data.success && data.following) {
        return data.following;
      }
      return [];
    } catch (error) {
      console.error('Error fetching following list:', error);
      return [];
    }
  };

  // Fetch current user profile to get user ID
  const fetchCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem("JWTRTIToken");
      if (!token) {
        console.error('No token found');
        return null;
      }

      const response = await fetch('http://api.rtiexpress.in/v1/profile/fetch', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Current user profile:', data);

      if (data.user) {
        return data.user._id || data.user.id;
      }
      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  };

  // Follow/Unfollow API call
  const toggleFollow = async (targetUserId, isCurrentlyFollowing) => {
    try {
      const token = await AsyncStorage.getItem("JWTRTIToken");
      if (!token) {
        Alert.alert('Error', 'Please log in to follow users');
        return;
      }

      let response;

      if (isCurrentlyFollowing) {
        // Unfollow API call (assuming similar pattern)
        response = await fetch(`http://api.rtiexpress.in/v1/user/follow/${targetUserId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Follow API call
        response = await fetch(`http://api.rtiexpress.in/v1/user/follow/${targetUserId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }

      const data = await response.json();
      console.log('Follow/Unfollow API Response:', data);

      if (response.ok && data.success) {
        // Update following list locally
        if (isCurrentlyFollowing) {
          // Remove from following list
          setFollowingList(prev => prev.filter(user => user._id !== targetUserId));
        } else {
          // Add to following list
          setFollowingList(prev => [...prev, { _id: targetUserId }]);
        }

        Alert.alert(
          'Success',
          isCurrentlyFollowing ? 'Unfollowed successfully' : 'Following successfully'
        );
      } else {
        Alert.alert('Error', data.message || 'Failed to update follow status');
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  // Fetch news from API
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://api.rtiexpress.in/v1/news/fetch');
      const data = await response.json();

      if (data.successful && data.news) {
        setNews(data.news);
      } else {
        setError('Failed to fetch news');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Get current user ID first
        const userId = await fetchCurrentUser();
        if (userId) {
          setCurrentUserId(userId);

          // Fetch following list for current user
          const following = await fetchFollowingList(userId);
          setFollowingList(following);
        }

        // Fetch news
        await fetchNews();
      } catch (error) {
        console.error('Error initializing data:', error);
        setError('Failed to load data');
      }
    };

    initializeData();
  }, []);

  // Handle follow toggle
  const handleFollowToggle = (targetUserId, isCurrentlyFollowing) => {
    toggleFollow(targetUserId, isCurrentlyFollowing);
  };

  // Error state
  if (error && !loading) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchNews}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Tab Navigation */}
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => navigation.navigate('FullNews')} style={styles.tabItem}>
            <Ionicons name="home" size={24} color="#007AFF" />
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
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
            <Ionicons name="person" size={24} color="#aaa" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading news...</Text>
        </View>
      </View>
    );
  }

  // If no news available, show fallback with your original design
  if (news.length === 0) {
    return (
      <View style={styles.container}>
        {/* Top Image - Fallback */}
        <View style={styles.headerImage}>
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No News Available</Text>
          </View>
        </View>

        {/* Top Icons */}
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.rightIcons}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => navigation.navigate('LocationSearch')}
            >
              <Ionicons name="location-outline" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => navigation.navigate('NotificationScreen')}
            >
              <Ionicons name="notifications-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Tab Navigation */}
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => navigation.navigate('FullNews')} style={styles.tabItem}>
            <Ionicons name="home" size={24} color="#007AFF" />
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
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
            <Ionicons name="person" size={24} color="#aaa" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Full-Screen News List with Swipe */}
      <FlatList
        ref={flatListRef}
        data={news}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <FullScreenNewsItem
            item={item}
            followingList={followingList}
            onFollowToggle={handleFollowToggle}
            currentUserId={currentUserId}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />

      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('FullNews')} style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#007AFF" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
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
          <Ionicons name="person" size={24} color="#aaa" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: height,
  },

  headerImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },

  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    fontSize: 18,
    color: '#666',
  },

  topIcons: {
    position: 'absolute',
    top: 45,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rightIcons: {
    flexDirection: 'row',
    gap: 15,
  },

  iconCircle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },

  card: {
    backgroundColor: '#fff',
    marginTop: -60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#111',
    flex: 1,
    marginRight: 10,
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    padding: 10,
    marginVertical: 16,
    backgroundColor: '#fff',
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },

  authorDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  authorInfo: {
    flex: 1,
  },

  authorName: {
    fontWeight: '600',
    color: '#111',
    fontSize: 14,
    marginBottom: 2,
  },

  authorDate: {
    fontSize: 12,
    color: '#6b7280',
  },

  followPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#007AFF',
  },

  followText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },

  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
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
    marginTop: 2,
  },

  tabLabelActive: {
    color: '#007AFF',
  },
});