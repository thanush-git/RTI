import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

export default function PublishNewsScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState('');
  const [district, setDistrict] = useState(''); 
  const richText = useRef();

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   quality: 1,
    let result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 1,          // Maximum quality
  allowsEditing: false // Disable cropping
});


    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const handlePublish = () => {
    if (!title || !content || !district) {  
      Alert.alert('Error', 'Please enter title, content, and district');
      return;
    }

    
    navigation.navigate('LocationSearch', { title, coverImage, content, district });
    Alert.alert('Success', 'News Published!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create News</Text>

      <TouchableOpacity style={styles.coverPicker} onPress={pickImage}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <Text style={styles.coverText}>+ Add Cover Photo</Text>
        )}
      </TouchableOpacity>

        <TextInput
        placeholderTextColor='gray'
        placeholder="News title"
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
      />

        <TextInput
        placeholderTextColor='gray'
        placeholder="District / City / County"
        style={styles.districtInput}
        value={district}
        onChangeText={setDistrict}
      />

      <RichEditor
        ref={richText}
        style={styles.richEditor}
        placeholder="Write your news/article here..."
        onChange={setContent}
        initialContentHTML={content}
      />

      <RichToolbar
        editor={richText}
        actions={[actions.setBold, actions.setItalic, actions.insertBulletsList, actions.insertOrderedList, actions.insertLink]}
        style={styles.toolbar}
      />

      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishText}>Publish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  coverPicker: {
    height: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  coverText: { color: '#999' },
  coverImage: { width: '100%', height: '100%', borderRadius: 8 },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  districtInput: { 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  richEditor: {
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  toolbar: { backgroundColor: '#eee', marginBottom: 16 },
  publishButton: {
    backgroundColor: '#0077B6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
