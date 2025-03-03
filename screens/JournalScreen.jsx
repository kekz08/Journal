import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadEntries, saveEntries } from '../utils/storage';

const JournalScreen = () => {
    const navigation = useNavigation();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            const loadedEntries = await loadEntries();
            setEntries(loadedEntries);
        };
        fetchEntries();
    }, []);

    const handleAddEntry = () => {
        navigation.navigate('AddEntry', {
            onSave: async (newEntry) => {
                const updatedEntries = [...entries, newEntry];
                setEntries(updatedEntries);
                await saveEntries(updatedEntries);
            },
        });
    };

    const handleEditEntry = (entry) => {
        navigation.navigate('EditEntry', {
            entry,
            onSave: async (updatedEntry) => {
                const updatedEntries = entries.map((e) =>
                    e.id === updatedEntry.id ? updatedEntry : e
                );
                setEntries(updatedEntries);
                await saveEntries(updatedEntries);
            },
        });
    };

    const handleDeleteEntry = async (id) => {
        const updatedEntries = entries.filter((entry) => entry.id !== id);
        setEntries(updatedEntries);
        await saveEntries(updatedEntries);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>Local Journal</Text>
                <TouchableOpacity style={styles.menuButton} onPress={handleAddEntry}>
                    <Text style={styles.menuIcon}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <>
                        <Text style={styles.welcomeText}>Welcome to Local Journal!</Text>
                        <Text style={styles.subText}>Start documenting your thoughts and experiences.</Text>
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.entry}>
                        <Text style={styles.entryTitle}>{item.title}</Text>
                        <Text>{item.content}</Text>
                        <Text>Mood: {item.mood}</Text>
                        <TouchableOpacity onPress={() => handleEditEntry(item)} style={styles.button}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleDeleteEntry(item.id)} style={styles.button}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#2196F3',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    menuButton: {
        padding: 8,
    },
    menuIcon: {
        fontSize: 24,
        color: '#fff',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        padding: 16,
    },
    subText: {
        fontSize: 16,
        color: '#666',
        paddingHorizontal: 16,
    },
    entry: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    entryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default JournalScreen;