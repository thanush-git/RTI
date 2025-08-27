import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NewsDetail({ navigation }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(24500);
  const [commentsCount] = useState(1.2); // 1.2k

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikesCount((c) => (liked ? c - 1 : c + 1));
  };

  const toggleSave = () => setSaved((v) => !v);

  const openSplash = () => {
    navigation.navigate('AuthenticationScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={openSplash}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image
              source={require('../Assets/Ellipse.png')} 
              style={styles.logo}
            />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.publisher}>BBC News</Text>
              <Text style={styles.time}>1 min ago</Text>
            </View>

            <TouchableOpacity style={styles.followBadge}>
              <Text style={styles.followBadgeText}>Following</Text>
            </TouchableOpacity>
          </View>

          {/* hero image */}
          <Image
            source={require('../Assets/image1.png')} 
            style={styles.hero}
            resizeMode="cover"
          />
          <Text style={styles.category}>Europe</Text>

          {/* Title */}
          <Text style={styles.title}>
            BBC: Blood money being paid for Russian oil
          </Text>

          {/* Body */}
          <Text style={styles.body}>
            Ukrainian President Volodymyr Zelensky has accused European countries that continue to
            buy Russian oil of “earning their money in other people’s blood”.
          </Text>

          <Text style={styles.body}>
            In an interview with the BBC, President Zelensky singled out Germany and Hungary,
            accusing them of blocking efforts to embargo energy sales, from which Russia stands to make up to
            £250bn ($326bn) this year.
          </Text>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={toggleLike}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={22}
                color={liked ? '#FF3B30' : '#333'}
              />
              <Text style={styles.actionText}>{(likesCount / 1000).toFixed(1)}k</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={() => {}}>
              <Ionicons name="chatbubble-outline" size={22} color="#333" />
              <Text style={styles.actionText}>{commentsCount}k</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={toggleSave}>
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color="#333"
              />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={() => {}}>
              <Ionicons name="share-outline" size={22} color="#333" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logo: { width: 30, height: 30, borderRadius: 15 },
  publisher: { fontWeight: '700', fontSize: 14 },
  time: { color: '#777', fontSize: 12 },
  followBadge: {
    marginLeft: 'auto',
    backgroundColor: '#2F6BFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  followBadgeText: { color: '#fff', fontSize: 12 },
  hero: { width: '100%', height: 220, borderRadius: 8, marginVertical: 8 },
  category: { color: '#777', fontSize: 12, marginTop: 4 },
  title: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  body: { fontSize: 15, color: '#333', marginTop: 12, lineHeight: 22 },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  actionText: { marginLeft: 4, color: '#333' },
});
