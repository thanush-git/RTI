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

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image
        source={require('../../Assets/Rectangle.png')}
        style={styles.headerImage}
      />

      {/* Top icons */}
      {/* <View style={styles.topIcons}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>


        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="location-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <Ionicons name="notifications-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View> */}


      {/* Top icons */}
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


      {/* Share Coin */}
      <TouchableOpacity style={styles.coinTop}>
        {/* <Text style={styles.coin}></Text> */}
      </TouchableOpacity>

      {/* Content Card */}
      <ScrollView style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>Unravel mysteries{'\n'}of the Maldives</Text>
          <TouchableOpacity>
            <Feather name="share" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Author row */}
        <View style={styles.authorRow}>
          <Image
            source={require('../../Assets/Rectangle.png')}
            style={styles.avatar}
          />
          <Text style={styles.meta}>Keanu Carpent     May 17     8 min read</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Just say anything, George, say what ever’s natural, the first thing that comes to your mind.
          Take that you mutated son-of-a-bitch. My pine, why you. You space bastard, you killed a pine.
          You do? Yeah,  8:00. Hey, McFly, I thought I told you never in tobwchcfuhhjsvfiu jfuygbcfi iwybcifhhe world of poverty and 6owgeivweweiru...<Text style={styles.readMore}>ReadMore..</Text>
        </Text>
      </ScrollView>

      {/* Floating Yellow Buttons */}
      {/* <View style={styles.floatingCoins}>
        <Text style={styles.coin}></Text>
        <Text style={styles.coin}></Text>
      </View> */}

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
  headerImage: { width: '100%', height: 300, resizeMode: 'cover' },
  topIcons: {
    position: 'absolute',
    top: 15,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIcons: { flexDirection: 'row', gap: 15 },
  iconCircle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  coinTop: {
    position: 'absolute',
    top: 260,
    right: 20,
    zIndex: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: 'bold', lineHeight: 30 },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  avatar: { width: 30, height: 30, borderRadius: 15 },
  meta: { color: '#888', fontSize: 12 },
  description: { fontSize: 14, color: '#444' },
  readMore: { color: '#0056d6', fontWeight: 'bold' },
  floatingCoins: {
    position: 'absolute',
    bottom: 80,
    left: '40%',
    flexDirection: 'row',
    gap: 20,
  },
  coin: {
    backgroundColor: '#FFD700',
    borderRadius: 30,
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    elevation: 2,
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