import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TabIcon({ name, label, onPress, active }) {
  const color = active ? '#1478FF' : '#888';

  const fontAwesomeIcons = ['graduation-cap', 'line-chart', 'tv', 'image', 'user'];
  let IconComponent = Ionicons;
  if (fontAwesomeIcons.includes(name)) {
    IconComponent = FontAwesome;
  }
  return (
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
      <IconComponent name={name} size={24} color={color} />
      <Text style={{ color, fontSize: 12, marginTop: 2 }}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function Settings() {
  const navigation = useNavigation();
  const route = useRoute();


  const [username, setUsername] = useState('User Name');
  const [profileImage, setProfileImage] = useState(null);

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
  const [darkMode, setDarkMode] = useState(false);

  const languages = ['English', 'Telugu', 'Hindi', 'Tamil'];
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'];


  useEffect(() => {
    if (route.params?.username) {
      setUsername(route.params.username);
    }
    if (route.params?.image) {
      setProfileImage(route.params.image);
    }
  }, [route.params]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out RTI EXPRESS app! https://yourapp.com',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share at the moment.');
    }
  };

  const handleRateUs = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=yourapp.id');
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        onPress: async () => {
          try {
            // Clear AsyncStorage
            await AsyncStorage.clear();

            // Sign out from Firebase
            await auth().signOut();

            // Navigate to login screen
            navigation.replace('AuthenticationScreen');
          } catch (error) {
            console.error('Sign out error:', error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
          }
        }
      },
    ]);
  };

  const renderOption = (label, icon, onPress, rightText = null) => (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.optionLeft}>
        {icon}
        <Text style={styles.optionText}>{label}</Text>
      </View>
      {rightText ? (
        <Text style={styles.optionRightText}>{rightText}</Text>
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#888" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, darkMode && { backgroundColor: '#111' }]}>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.profileCircle}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={80} color="#ccc" />
          )}
        </TouchableOpacity>
        <Text style={styles.profileName}>{username}</Text>
      </View>

      {renderOption('Home', <Ionicons name="home-outline" size={20} color="#555" />, () => navigation.navigate('FullNews'))}
      {renderOption('Select Language', <Feather name="globe" size={20} color="#555" />, () => setLanguageModalVisible(true), selectedLanguage)}
      {renderOption('Select Location', <Ionicons name="location-outline" size={20} color="#555" />, () => setLocationModalVisible(true), selectedLocation)}

      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <Ionicons name="moon-outline" size={20} color="#555" />
          <Text style={styles.optionText}>Dark Theme</Text>
        </View>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      {renderOption('Notifications', <Ionicons name="notifications-outline" size={20} color="#555" />, () => navigation.navigate('NotificationScreen'))}
      {renderOption('About Us', <Ionicons name="information-circle-outline" size={20} color="#555" />, () => navigation.navigate('AboutUsScreen'))}
      {renderOption('Contact Us', <Ionicons name="call-outline" size={20} color="#555" />, () => navigation.navigate('ContactUsScreen'))}
      {renderOption('Feedback', <Ionicons name="chatbubble-ellipses-outline" size={20} color="#555" />, () => navigation.navigate('FeedbackScreen'))}
      {renderOption('Refer the App', <Ionicons name="share-social-outline" size={20} color="#555" />, handleShare)}
      {renderOption('Rate Us', <Ionicons name="star-outline" size={20} color="#555" />, handleRateUs)}
      {renderOption('Sign out', <MaterialIcons name="logout" size={20} color="red" />, handleSignOut)}

      {/* Language Modal */}
      <Modal visible={languageModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLanguage(item);
                    setLanguageModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOption}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Location Modal */}
      <Modal visible={locationModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <FlatList
              data={locations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLocation(item);
                    setLocationModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOption}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TabIcon name="newspaper-outline" label="News" onPress={() => navigation.navigate('NHomeScreen')} />
        <TabIcon name="image" label="Media" onPress={() => navigation.navigate('MediaScreen')} />
        <TabIcon name="line-chart" label="Trending" onPress={() => navigation.navigate('Trending')} />
        <TabIcon name="graduation-cap" label="Career" onPress={() => navigation.navigate('Career')} />
        <TabIcon name="tv" label="Tech" onPress={() => navigation.navigate('TechScreen')} active />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop:40},
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  optionText: { color: '#1b1a1aff',fontSize: 16 },
  optionRightText: { color: '#888', fontSize: 14 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  modalOption: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});