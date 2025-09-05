import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import { useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { UserContext } from './UserContext';

export default function AddPostScreen({ navigation }) {
  const [postImage, setPostImage] = useState(null);
  const [heading, setHeading] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [article, setArticle] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [fcmTokenSaved, setFcmTokenSaved] = useState(false);

  const { userData, userPosts, setUserPosts } = useContext(UserContext);

  // Function to save FCM token
  const saveFCMToken = async () => {
    try {
      // Check if token is already saved in this session
      const tokenSaved = await AsyncStorage.getItem('fcmTokenSaved');
      if (tokenSaved === 'true') {
        setFcmTokenSaved(true);
        return true;
      }

      // Request notification permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);

        // Get FCM token
        const token = await messaging().getToken();
        console.log('FCM Token:', token);

        if (token) {
          // Get user ID from userData context
          const userId = userData?.id || userData?._id || "687f1ae1c681d5f4fdb37a68"; // fallback ID
          const platform = Platform.OS;

          console.log('Saving token with data:', { userId, token, platform });

          // Get JWT token for authorization
          const jwtToken = await AsyncStorage.getItem("JWTRTIToken");

          // Save token to backend with proper headers
          const result = await axios.post("https://api.rtiexpress.in/v1/notification/savetoken", {
            userId,
            token,
            platform
          }, {
            headers: {
              'Content-Type': 'application/json',
              ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
            }
          });

          console.log('FCM Token saved successfully:', result.data);

          // Mark as saved in local storage
          await AsyncStorage.setItem('fcmTokenSaved', 'true');
          setFcmTokenSaved(true);
          return true;
        } else {
          console.log('No FCM token received');
          return true;
        }
      } else {
        console.log('Notification permission denied');
        // Still allow posting even if notification permission is denied
        return true;
      }
    } catch (error) {
      console.error('Error saving FCM token:', error);

      // Log more details about the error
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      // Don't block posting if FCM token saving fails
      return true;
    }
  };

  // Request permissions when component mounts
  useEffect(() => {
    (async () => {
      // Request image picker permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera roll permissions are required to upload images.');
      }

      // Save FCM token
      await saveFCMToken();

      // Handle foreground messages
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);

        if (remoteMessage.notification) {
          Alert.alert(
            remoteMessage.notification.title || 'Notification',
            remoteMessage.notification.body || ''
          );
        }
      });

      // Handle background messages
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', remoteMessage);
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('Notification caused app to open from quit state:', remoteMessage);
          }
        });

      return unsubscribe;
    })();
  }, []);

  const pickPostImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setPostImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to open image picker');
    }
  };

  const handlePostSubmit = async () => {
    if (!postImage || !category || !article || !heading) {
      Alert.alert("Validation Error", "All required fields must be filled.");
      return;
    }

    try {
      // Ensure FCM token is saved before posting
      if (!fcmTokenSaved) {
        console.log('Saving FCM token before posting...');
        await saveFCMToken();
      }

      let formData = new FormData();

      // Attach image
      formData.append("media", {
        uri: postImage,
        name: "upload.jpg",
        type: "image/jpeg",
      });

      // Get the JWT Token
      const token = await AsyncStorage.getItem("JWTRTIToken");
      console.log(token);

      if (!token) {
        throw new Error("No token found in storage");
      }

      // Other fields
      formData.append("headline", heading);
      formData.append("description", article);
      formData.append("location", "AP");
      formData.append("category", category);
      formData.append("language", "English");

      const response = await fetch("http://api.rtiexpress.in/v1/news/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "News uploaded successfully!");
        console.log(data);

        // Reset form
        setPostImage(null);
        setHeading('');
        setArticle('');
        setCategory('');
        setSelectedValue('');

        navigation.navigate("ProfilePreview");
      } else {
        console.error("Upload failed:", data);
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error uploading news:", err);
      Alert.alert("Error", "Failed to upload news.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Post</Text>

      <TouchableOpacity style={styles.imageBox} onPress={pickPostImage}>
        {postImage ? (
          <Image source={{ uri: postImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Feather name="plus" size={30} color="#aaa" />
            <Text style={styles.imageText}>Add Cover Photo/Video</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="News Title (max 100 letters)"
        placeholderTextColor="#555"
        value={heading}
        onChangeText={setHeading}
        style={styles.input}
        maxLength={100}
      />

      <TextInput
        placeholder="Add News/Article (max 1500 letters)"
        placeholderTextColor="#555"
        value={article}
        onChangeText={setArticle}
        style={[styles.input, styles.articleInput]}
        multiline
        numberOfLines={20}
        maxLength={1500}
      />

      <View style={styles.category}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Politics" value="politics" />
          <Picker.Item label="Technology" value="technology" />
          <Picker.Item label="Sports" value="sports" />
          <Picker.Item label="Business" value="business" />
          <Picker.Item label="Entertainment" value="entertainment" />
          <Picker.Item label="Education" value="education" />
          <Picker.Item label="Lifestyle" value="lifestyle" />
          <Picker.Item label="Travel" value="travel" />
          <Picker.Item label="Local News" value="local" />
          <Picker.Item label="International News" value="international" />
          <Picker.Item label="Breaking News" value="breaking" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.postButton} onPress={handlePostSubmit}>
        <Text style={styles.postButtonText}>Publish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    paddingTop: 45,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  imageBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dashed',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imageText: {
    color: '#666',
    marginTop: 10,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  picker: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    color: 'black',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  articleInput: {
    height: 250,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  category: {
    marginBottom: 15,
  },
});