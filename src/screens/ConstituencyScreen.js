import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const districtData = [
  // Andhra Pradesh (26)
  "Srikakulam", "Parvathipuram Manyam", "Vizianagaram", "Visakhapatnam",
  "Alluri Sitharama Raju", "Anakapalli", "Kakinada", "East Godavari",
  "Konaseema", "Eluru", "West Godavari", "NTR District", "Krishna",
  "Palnadu", "Guntur", "Bapatla", "Sri Potti Sriramulu Nellore", "Prakasam",
  "Kurnool", "Nandyal", "Ananthapuramu", "Sri Sathya Sai", "YSR Kadapa",
  "Annamayya", "Chittoor", "Tirupati",
  // Telangana (33)
  "Adilabad", "Bhadradri Kothagudem", "Hanumakonda", "Hyderabad", "Jagtial",
  "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy",
  "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar",
  "Mancherial", "Medak", "Medchal‑Malkajgiri", "Mulugu", "Nagarkurnool",
  "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli",
  "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet",
  "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
];

export default function ConstituencyScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const filteredDistricts = districtData.filter(d =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your District</Text>

        <TextInput
        placeholderTextColor='gray'
        placeholder="Search district"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredDistricts}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          const isSelected = item === selectedDistrict;
          return (
            <TouchableOpacity
              style={[styles.item, isSelected && styles.selectedItem]}
              onPress={() => setSelectedDistrict(item)}
            >
              <Text style={[styles.itemText, isSelected && styles.selectedText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={[styles.button, !selectedDistrict && { backgroundColor: '#ccc' }]}
        onPress={() => {
          if (selectedDistrict) {
            // Optionally pass district as a param
            navigation.navigate('NewsSourceScreen', {
              selectedDistrict,
            });
          }
        }}
        disabled={!selectedDistrict}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1877F2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
