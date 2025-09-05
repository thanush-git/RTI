import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

const statesData = [
  {
    name: 'Andhra Pradesh',
    image:
      require('../../assets/images/andhra.webp'),
  },
  {
    name: 'Telangana',
    image:
          require('../../assets/images/telangana.jpg'),
  },
];

const NewsSourceScreen = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState(null);

  const handleSelect = (state) => {
    setSelectedState(state);
  };

  const handleNext = () => {
    if (!selectedState) {
      alert('Please select a state');
      return;
    }
    console.log('Selected:', selectedState);
    navigation.navigate('LanguageScreen', { state: selectedState });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {statesData.map((item) => {
          const isSelected = selectedState === item.name;
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => handleSelect(item.name)}
              activeOpacity={0.8}
              style={[styles.card, isSelected && styles.selectedCard]}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewsSourceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  scroll: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  selectedCard: {
    backgroundColor: '#a7ceff',
    //borderWidth: 2,
    //borderRadius: 15,
  },
  image: {
    width: '100%',
    borderRadius: 20,
    height: 250,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 30,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
