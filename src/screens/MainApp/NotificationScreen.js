import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../UserContext';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { incrementFollowers } = useContext(UserContext);

  const initialFollowState = { '2': false, '4': false };
  const [followState, setFollowState] = useState(initialFollowState);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const toggleFollow = (id, name) => {
    setFollowState(prev => {
      const wasFollowing = prev[id];
      if (!wasFollowing) incrementFollowers();
      return { ...prev, [id]: !wasFollowing };
    });
  };

  const data = [
    { id: '1', title: 'BBC News has posted new Europe news...', time: '15m ago', name: 'BBC News', action: 'posted news', avatar: null },
    { id: '2', title: 'Modelyn Saris is now following you', time: '1h ago', followable: true, name: 'Modelyn Saris', action: 'started following you', avatar: null },
    { id: '3', title: 'Omar Merditz commented on your news...', time: '1h ago', name: 'Omar Merditz', action: 'commented on your news', avatar: null },
    { id: '4', title: 'Marley Botosh is now following you', time: '1 Day ago', followable: true, name: 'Marley Botosh', action: 'started following you', avatar: null },
    { id: '5', title: 'Modelyn Saris liked your news...', time: '1 Day ago', name: 'Modelyn Saris', action: 'liked your news', avatar: null },
    { id: '6', title: 'CNN has posted new travel news...', time: '1 Day ago', name: 'CNN', action: 'posted news', avatar: null },
  ];

  const openProfile = item => {
    setSelectedNotification(item);
    setModalVisible(true);
  };

  const closeProfile = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  const renderItem = ({ item }) => {
    const isFollowed = followState[item.id];
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.avatarPlaceholder}
          onPress={() => openProfile(item)}
        />
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        {item.followable && (
          <TouchableOpacity
            style={[
              styles.followBtn,
              { backgroundColor: isFollowed ? '#EAEAEA' : '#E0EEFF' },
            ]}
            onPress={() => toggleFollow(item.id, item.name)}
          >
            <Text
              style={[
                styles.followText,
                { color: isFollowed ? 'gray' : '#1478FF' },
              ]}
            >
              {isFollowed ? 'Following' : '+ Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <Text style={styles.options}>⋮</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {selectedNotification && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          hardwareAccelerated
          onRequestClose={closeProfile}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              {/* Avatar or big circle */}
              <View style={styles.profileImgLarge} />

              {/* Name and action */}
              <Text style={styles.modalName}>{selectedNotification.name}</Text>
              <Text style={styles.modalAction}>
                {selectedNotification.action}
              </Text>

              {/* “View Full Profile” button */}
              <TouchableOpacity
                style={styles.viewProfileBtn}
                onPress={() => {
                  closeProfile();
                  navigation.navigate('Publisher', {
                    name: selectedNotification.name,
                    action: selectedNotification.action,
                  });
                }}
              >
                <Text style={styles.viewText}>View Full Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeProfile} style={styles.closeText}>
                <Text style={styles.closeTextInner}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },
  header: {
    paddingTop: 4,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backArrow: { fontSize: 22, fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  options: { fontSize: 22, fontWeight: 'bold', color: 'gray' },

  card: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FA',
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  title: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  time: { fontSize: 12, color: 'gray' },

  followBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  followText: { fontSize: 12, fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
    elevation: 10,
  },
  profileImgLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  modalName: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  modalAction: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 16 },
  viewProfileBtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#2F6BFF',
    borderRadius: 8,
    marginBottom: 12,
  },
  viewText: { color: 'white', fontWeight: '600' },
  closeText: {},
  closeTextInner: { color: '#2F6BFF', marginTop: 8 },
});

export default NotificationScreen;
