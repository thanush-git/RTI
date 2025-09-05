import React from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FullNews() {
  const navigation = useNavigation();

  const [isFollowing, setIsFollowing] = React.useState(true);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image
        source={require('../../Assets/Rectangle.png')}
        style={styles.headerImage}
      />

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

      {/* Content Card */}
      <ScrollView style={styles.card} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>Unravel mysteries{'\n'}of the Maldives</Text>
          <TouchableOpacity>
            <Feather name="share" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Author Row */}
        <View style={styles.authorContainer}>
          {/* Avatar */}
          <Image
              source={require('../../Assets/Rectangle.png')}
              style={styles.avatar}
          />

          {/* Author Details */}
          <View style={styles.authorDetails}>
            <Text style={styles.authorName}>Sai Krishna</Text>
            <Text style={styles.authorDate}>May 17</Text>

            <TouchableOpacity
                        style={[
                          styles.followPill,
                          !isFollowing && { backgroundColor: '#fff', borderWidth: 1, borderColor: '#007AFF' },
                        ]}
                        onPress={handleFollowToggle}
                      >
                        <Text style={[styles.followText, !isFollowing && { color: '#007AFF' }]}>
                          {isFollowing ? 'Following' : 'Follow'}
                        </Text>
                      </TouchableOpacity>
                    </View>
          </View>

        {/* Description */}
        <Text style={styles.description}>
          The Maldives has welcomed over 2 million visitors this year, with travelers flocking to its pristine beaches, turquoise waters, and luxury resorts.Officials say new eco-friendly policies, including solar-powered resorts and plastic-free islands, are attracting more environmentally conscious tourists. Airlines have also added new direct flights, making the destination more accessible than ever before.

        </Text>
      </ScrollView>

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
  container: { flex: 1, backgroundColor: '#fff' },

  headerImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
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
  },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  authorDetails: {
    marginLeft: 10,
    flex: 1,
  },

  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },

  postMeta: {
    fontSize: 12,
    color: '#888',
  },

  followPill: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  followText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },

  readMore: {
    color: '#007AFF',
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

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',   // light gray border
    borderRadius: 20,
    padding: 10,
    marginVertical: 6,
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

  authorName: {
    fontWeight: '600',
    color: '#111',
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
  },
});