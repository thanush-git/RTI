import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import { useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserContext } from './UserContext';

export default function AddPostScreen({ navigation }) {
  const [postImage, setPostImage] = useState(null);
  const [heading, setHeading] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [article, setArticle] = useState('');

  const { userData, userPosts, setUserPosts } = useContext(UserContext);

  // Request permissions when component mounts
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera roll permissions are required to upload images.');
      }
    })();
  }, []);

  const pickPostImage = async () => {
    try {
      // Request permissions first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fixed: Use MediaTypeOptions instead of MediaType
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
    if (!postImage || !heading || !category || !article) {
      Alert.alert("Validation Error", "All required fields must be filled.");
      return;
    }

    try {
      let formData = new FormData();

      // Attach image
      formData.append("media", {
        uri: postImage,
        name: "upload.jpg",
        type: "image/jpeg",
      });

      //Get the JWT Token
      const token = await AsyncStorage.getItem("jwtRTIToken");

       if (!token) {
            throw new Error("No token found in storage");
       }

      // Other fields
      formData.append("headline", heading);
      formData.append("description", article);
      formData.append("location", "AP"); // you can replace with dynamic value
      formData.append("category", category);
      formData.append("language", "English");

      const response = await fetch("http://api.rtiexpress.in/api/v1/news/upload", {
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
            <Feather name="camera" size={30} color="#aaa" />
            <Text style={styles.imageText}>Add Post Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Add Heading"
        placeholderTextColor="#555"
        value={heading}
        onChangeText={setHeading}
        style={styles.input}
      />

      <TextInput
        placeholder="Add Tag"
        placeholderTextColor="#555"
        value={tag}
        onChangeText={setTag}
        style={styles.input}
      />

      <TextInput
        placeholder="Category"
        placeholderTextColor="#555"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TextInput
        placeholder="Add Video Link"
        placeholderTextColor="#555"
        value={videoLink}
        onChangeText={setVideoLink}
        style={styles.input}
      />

      <TextInput
        placeholder="Write Articles"
        placeholderTextColor="#555"
        value={article}
        onChangeText={setArticle}
        style={[styles.input, styles.articleInput]}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePostSubmit}>
        <Text style={styles.postButtonText}>POST</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000', // title text color
  },
  imageBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imageText: {
    color: '#666', // softer gray
    marginTop: 10,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
    height: 120,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
