import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    
    image: require('../Assets/NewsImage.png'),
    title: 'Lorem Ipsum is simply dummy',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    key: '2',
    image: require('../Assets/NewsImage1.png'),
    title: 'Lorem Ipsum is simply dummy',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    key: '3',
    image: require('../Assets/NewsImage2.png'),
    title: 'Lorem Ipsum is simply dummy',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

export default function Onboarding({ navigation }) {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goNext = () => {
    if (index < slides.length - 1) {
      ref.current?.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace('AuthenticationScreen' ); 
    }
  };

  const goBack = () => {
    if (index > 0) {
      ref.current?.scrollToIndex({ index: index - 1 });
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={slides}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* dots + buttons */}
      <View style={styles.bottomBar}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, index === i && styles.dotActive]}
            />
          ))}
        </View>

        <View style={styles.actions}>
          {index > 0 ? (
            <TouchableOpacity style={[styles.btn, styles.backBtn]} onPress={goBack}>
              <Text style={[styles.btnText, styles.backBtnText]}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 70 }} />
          )}

          <TouchableOpacity style={[styles.btn, styles.nextBtn]} onPress={goNext}>
          <Text style={styles.btnText}>
              {index === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const BOTTOM_HEIGHT = 120;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  slide: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: height * 0.55 },
  content: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  desc: { fontSize: 14, color: '#555' },

  bottomBar: {
    height: BOTTOM_HEIGHT,
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  dots: { flexDirection: 'row', marginTop: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
    marginRight: 6,
  },
  dotActive: { backgroundColor: '#2F6BFF' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: '#F1F1F1',
  },
  backBtnText: {
    color: '#555',
  },
  nextBtn: {
    backgroundColor: '#2F6BFF',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
