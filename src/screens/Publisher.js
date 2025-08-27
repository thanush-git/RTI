import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Publisher({ route, navigation }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Extract dynamic data passed via navigation or modal
  const { name = 'Forbes', action = '' } = route.params || {};

  const onPressFollow = () => {
    setIsFollowing(true);
    navigation.navigate('NewsDetail');
  };

  const data = [
    {
      id: '1',
      title: 'Tech Startup Secures $50 Million Funding for Expansion',
      date: 'Jun 11, 2023',
      tag: 'Business',
      thumbnail: require('../Assets/CoverImg.png'),
    },
    {
      id: '2',
      title: 'Market reacts to latest policy announcement',
      date: 'Jun 12, 2023',
      tag: 'Markets',
      thumbnail: require('../Assets/CoverImg.png'),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image
          source={require('../Assets/ProfileImg.png')}
          style={styles.publisherLogoSmall}
        />
        <Text style={styles.publisherNameSmall}>{name}</Text>
        <Ionicons
          name="ellipsis-vertical"
          size={18}
          color="#999"
          style={{ marginLeft: 'auto' }}
        />
      </View>

      <Text style={styles.cardDate}>
        {name} • {item.date}
      </Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.thumbnail && (
        <Image source={item.thumbnail} style={styles.cardImage} resizeMode="cover" />
      )}

      <View style={styles.tag}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>
    </View>
  );

  
  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.handle}>{name.toLowerCase().replace(/\s+/g, '')}</Text>
        <Ionicons name="ellipsis-vertical" size={20} color="#000" style={{ marginLeft: 'auto' }} />
      </View>

      {/* Profile Section */}
      <View style={styles.topBox}>
        <Image source={require('../Assets/ProfileImg.png')} style={styles.publisherLogo} />
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>6.8k</Text>
            <Text style={styles.statLabel}>News</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>2.5k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>100</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.followBtn, isFollowing && styles.followingBtn]}
          onPress={onPressFollow}
        >
          <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.publisherName}>{name}</Text>
        <Text style={styles.bio}>
          {action
            ? `${name} ${action}.`
            : 'Empowering your business journey with expert insights and influential perspectives.'}
        </Text>
      </View>

      {/* Sort + View Switch */}
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>
          Sort by: <Text style={{ fontWeight: '600' }}>Newest</Text>
        </Text>
        <Ionicons
          name="list"
          size={18}
          color="#000"
          style={{ marginLeft: 'auto', marginRight: 8 }}
        />
        <Ionicons name="grid" size={18} color="#000" />
      </View>

      {/* Search */}
      <View style={styles.search}>
        <Ionicons name="search" size={18} color="#aaa" />
          <TextInput
        placeholderTextColor='gray' placeholder='Search "News"' style={styles.searchInput} />
      </View>

      {/* News List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  handle: { fontSize: 18, fontWeight: '600', marginLeft: 12 },
  topBox: { alignItems: 'center', marginBottom: 16 },
  publisherLogo: { width: 72, height: 72, borderRadius: 12, marginBottom: 12 },
  statsRow: { flexDirection: 'row', marginBottom: 12 },
  stat: { alignItems: 'center', marginHorizontal: 12 },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { fontSize: 12, color: '#777' },
  followBtn: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  followingBtn: {
    backgroundColor: '#E8F0FF',
  },
  followBtnText: { color: '#fff', fontWeight: '600' },
  followingBtnText: { color: '#2F6BFF' },
  publisherName: { fontSize: 18, fontWeight: '700', marginTop: 4 },
  bio: { textAlign: 'center', color: '#666', marginTop: 4, paddingHorizontal: 12 },

  sortRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 8 },
  sortLabel: { fontSize: 14, color: '#222' },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: { marginLeft: 6, flex: 1 },

  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  publisherLogoSmall: { width: 20, height: 20, borderRadius: 4, marginRight: 6 },
  publisherNameSmall: { fontSize: 12, fontWeight: '600' },
  cardDate: { fontSize: 11, color: '#999', marginTop: 4 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginVertical: 6 },
  cardImage: { width: '100%', height: 160, borderRadius: 8, marginTop: 6 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F0FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  tagText: { color: '#2F6BFF', fontSize: 12 },
});
