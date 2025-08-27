import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from "react-native-country-flag";

const languages = [
  { id: 1, name: 'Telugu', code: 'IN' },
  { id: 2, name: 'Hindi', code: 'IN' },
  { id: 3, name: 'English', code: 'US' }
];

const LanguageSelector = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleNext = () => {
    if (selectedLanguage) {
      // Navigate to next screen with language info
      navigation.navigate('ConstituencyScreen', { language: selectedLanguage });
    } else {
      alert('Please select a language first.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your Language</Text>

      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.id}
          style={[
            styles.languageOption,
            selectedLanguage?.id === lang.id && styles.selectedOption
          ]}
          onPress={() => handleLanguageSelect(lang)}
        >
          <CountryFlag isoCode={lang.code} size={20} />
          <Text
            style={[
              styles.languageText,
              selectedLanguage?.id === lang.id && styles.selectedText
            ]}
          >
            {lang.name}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.buttonBottom} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: 'center', color: '#888', marginTop: 20, fontSize: 16 }}>
        More languages Coming Soon..
      </Text>
    </View>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10
  },
  selectedOption: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2'
  },
  languageText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333'
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  button: {
    // deprecated, replaced by buttonBottom
  },
  buttonBottom: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
