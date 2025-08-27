import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

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
    // Proceed with selectedState
    console.log('Selected:', selectedState);
     navigation.navigate('LanguageScreen', { state: selectedState }); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {['AP State', 'Telangana'].map((state) => {
          const isSelected = selectedState === state;
          return (
            <TouchableOpacity
              key={state}
              onPress={() => handleSelect(state)}
              style={[
                styles.card,
                isSelected && styles.selectedCard,
              ]}
              activeOpacity={0.8}
            >
              <View style={styles.imagePlaceholder} />
              <Text style={styles.cardTitle}>{state}</Text>
              <TouchableOpacity
                onPress={() => handleSelect(state)}
                style={styles.selectButton}
              >
                <Text style={styles.selectText}>Select</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </View>

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
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  card: {
    width: width * 0.4,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
  },
  selectedCard: {
    borderColor: '#9b5de5',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  selectButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
  },
  selectText: {
    color: '#007bff',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
