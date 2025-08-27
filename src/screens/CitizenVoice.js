import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text, 
    TouchableOpacity,
    View
} from 'react-native';

const CitizenVoiceScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('Aadhar');

    const categories = [
        { key: 'Aadhar', label: 'Aadhar Issue', iconName: 'videocam', iconLib: 'Ionicons' },
        { key: 'Govt', label: 'Govt office', iconName: 'office-building', iconLib: 'MaterialCommunityIcons' },
        { key: 'Municipal', label: 'Municipal', iconName: 'archway', iconLib: 'FontAwesome5' },
    ];

    const renderIcon = (iconLib, iconName, size, color) => {
        switch(iconLib) {
            case 'Ionicons':
                return <Ionicons name={iconName} size={size} color={color} />;
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            case 'FontAwesome5':
                return <FontAwesome5 name={iconName} size={size} color={color} />;
            default:
                return <Ionicons name="help-circle" size={size} color={color} />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Citizen Voice</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.key;
                    return (
                        <TouchableOpacity
                            key={cat.key}
                            style={[styles.categoryBox, isSelected && styles.categoryBoxSelected]}
                            onPress={() => setSelectedCategory(cat.key)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconWrapper}>
                                {renderIcon(cat.iconLib, cat.iconName, 40, '#000')}
                            </View>
                            <Text style={styles.categoryLabel}>{cat.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Content Area */}
            <View style={styles.content}>
                <Text style={styles.selectedCategoryText}>
                    Selected Category: {selectedCategory}
                </Text>
                {/* Add your content based on selected category here */}
            </View>

            {/* Bottom Tab Bar */}
            <View style={styles.tabBar}>
                <TouchableOpacity onPress={() => navigation.navigate('FullNews')} style={styles.tabItem}>
                    <Ionicons name="home-outline" size={24} color="#aaa" />
                    <Text style={styles.tabLabel}>Home</Text>
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
                    <Ionicons name="person-outline" size={24} color="#aaa" />
                    <Text style={styles.tabLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CitizenVoiceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: '#000',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        paddingHorizontal: 10,
    },
    categoryBox: {
        width: 90,
        height: 90,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    categoryBoxSelected: {
        elevation: 12,
        shadowOpacity: 0.35,
        backgroundColor: '#f0f8ff',
    },
    iconWrapper: {
        marginBottom: 8,
    },
    categoryLabel: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    selectedCategoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    tabItem: {
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 2,
    },
});