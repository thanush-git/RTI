import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const people = [
  {
    id: 1,
    name: 'Kotipalli Baba',
    title: 'Chairman & Managing Director, RTI EXPRESS Group\nChief Editor, RTI EXPRESS News\nHonourable President & Founder, Andhra Pradesh RTI Activist Organization',
    contact: '76688 86666',
    image: require('../Assets/kothpalli.jpg'),
    bio: [
      'Mr. Kotipalli Baba is a renowned RTI (Right to Information) Activist and seasoned journalist, widely respected for his relentless efforts in promoting transparency, accountability, and good governance across public and private sectors in India.',
      'As the Chairman & Managing Director of RTI EXPRESS Group and Chief Editor of RTI EXPRESS News, Mr. Kotipalli Baba has led numerous investigative reports, exposed corruption, and championed the rights of the common people.',
      'Driven by a vision to create an informed and aware society, Mr. Kotipalli Baba has trained and inspired hundreds of young RTI activists and citizen journalists.',
      'With over two decades of experience in public advocacy and media leadership, Mr. Kotipalli Baba continues to be a torchbearer of journalistic integrity and a leading figure in the RTI movement in India.'
    ]
  },
  {
    id: 2,
    name: 'S. Ramachandra Naik',
    title: 'Associate Editor, RTI EXPRESS News\nState General Secretary, Andhra Pradesh RTI Activist Organization',
    contact: '89198 31001',
    image: require('../Assets/ramachandra.jpg'),
    bio: [
      'Mr. S. Ramachandra Naik is a dynamic and committed RTI activist with a strong track record in promoting transparency, accountability, and good governance.',
      'As the State General Secretary of the Andhra Pradesh RTI Activist Organization, he plays a crucial leadership role in guiding initiatives across the state.',
      'A respected Lokayukta promoter, Mr. Ramachandra Naik has been instrumental in promoting institutional integrity and anti-corruption mechanisms.',
      'His fearless activism and deep understanding of civic rights continue to be a voice for the voiceless and a catalyst for reform.'
    ]
  },
  {
    id: 3,
    name: 'Dr. M. Imran Ali Khan',
    title: 'Associate Editor – National News Reporter\nState President – Andhra Pradesh RTI Activist Organization',
    contact: '85498 44535',
    image: require('../Assets/baba.jpg'),
    bio: [
      'Dr. M. Imran Ali Khan is a respected and dynamic figure in journalism, social service, and RTI activism.',
      'As the State President of the Andhra Pradesh RTI Activist Organization, he has been at the forefront of promoting transparency and accountability.',
      'He is also a devoted social worker whose efforts have impacted communities across the state.'
    ]
  },
  {
    id: 4,
    name: 'D. SivaShankar',
    title: 'Chief Legal Advisor – RTI EXPRESS Group\nState President (Legal Cell) – Andhra Pradesh RTI Activist Organization\nRenowned Advocate | Legal Strategist | RTI Movement Supporter',
    contact: 'Not Mentioned',
    image: require('../Assets/shivasankar.jpg'),
    bio: [
      'Mr. D. Siva Shankar is a distinguished legal professional and advocate, currently serving as the Chief Legal Advisor of RTI Express Group.',
      'As the State President of the Legal Cell, he leads awareness campaigns and supports RTI activists legally across Andhra Pradesh.',
      'His integrity and dedication have made him a key name in the RTI movement.'
    ]
  }
];

export default function AboutUsScreen() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      {people.map((person) => (
        <View key={person.id} style={styles.profile}>
          <TouchableOpacity onPress={() => setExpandedId(expandedId === person.id ? null : person.id)}>
            <Text style={styles.name}>{person.id}. {person.name}</Text>
          </TouchableOpacity>
          {expandedId === person.id && (
            <View style={styles.details}>
              <View style={styles.profileHeader}>
                <View style={styles.textInfo}>
                  <Text style={styles.title}>{person.title}</Text>
                  <Text style={styles.contact}>Contact: {person.contact}</Text>
                  {person.bio.map((para, i) => (
                    <Text key={i} style={styles.bio}>{para}</Text>
                  ))}
                </View>
                <Image source={person.image} style={styles.image} resizeMode="contain" />
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  profile: { marginBottom: 20, borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 10 },
  name: { fontSize: 18, color: '#004aad', marginBottom: 5 },
  details: { marginTop: 10 },
  profileHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  textInfo: { flex: 1 },
  title: { fontStyle: 'italic', color: '#555', fontWeight: 'bold', marginBottom: 5 },
  contact: { color: '#0077cc', marginBottom: 10 },
  bio: { marginBottom: 8, lineHeight: 20 },
  image: { width: 120, height: 120, borderRadius: 8 }
});
