import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';

const EntryList = ({ entries, onEdit, onDelete, onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false); // State to track refresh status

  // Function to handle the refresh action
  const handleRefresh = async () => {
    setRefreshing(true); // Start refreshing
    await onRefresh(); // Call the onRefresh function passed from the parent
    setRefreshing(false); // Stop refreshing
  };

  const renderEntry = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.moodContainer}>
        <Text style={styles.moodText}>Mood: </Text>
        <Text style={[styles.moodText, getMoodStyle(item.mood)]}>{item.mood}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            console.log('Edit button clicked', item); // Debug log
            onEdit(item); // Call the onEdit function
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getMoodStyle = (mood) => {
    switch (mood) {
      case 'Happy':
        return styles.moodHappy;
      case 'Sad':
        return styles.moodSad;
      default:
        return styles.moodNeutral;
    }
  };

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={renderEntry}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={refreshing} // Pass the refreshing state
          onRefresh={handleRefresh} // Call handleRefresh when pulled down
          colors={['#2196F3']} // Customize the loading spinner color
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  moodContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  moodText: {
    fontSize: 14,
    color: '#666',
  },
  moodHappy: {
    color: '#4CAF50', // Green for happy
  },
  moodSad: {
    color: '#F44336', // Red for sad
  },
  moodNeutral: {
    color: '#2196F3', // Blue for neutral
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default EntryList;