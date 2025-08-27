import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function NewsList({ route }) {
  const { news, location } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
        {location} News
      </Text>

      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            {item.coverImage && (
              <Image source={{ uri: item.coverImage }} style={styles.image} />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
            No news available for this location.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  image: { width: '100%', height: 150, borderRadius: 6 },
  title: { fontWeight: 'bold', fontSize: 18, marginTop: 10 },
  content: { marginTop: 5 },
});
