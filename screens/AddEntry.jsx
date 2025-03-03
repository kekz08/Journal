import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

const AddEntry = ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Neutral');

  const { onSave } = route.params;

  const handleSave = () => {
    const newEntry = {
      id: Date.now().toString(),
      title,
      content,
      mood,
      date: new Date().toISOString(),
    };
    onSave(newEntry);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Entry</Text>

      {/* Title Input */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Content Input */}
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Write your thoughts here..."
        value={content}
        onChangeText={setContent}
        multiline
      />

      {/* Mood Selection */}
      <Text style={styles.label}>Mood</Text>
      <View style={styles.moodContainer}>
        {['Happy', 'Neutral', 'Sad'].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.moodButton, mood === m && styles.selectedMood]}
            onPress={() => setMood(m)}
          >
            <Text style={styles.moodText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    fontSize: 16,
  },
  multilineInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  moodButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  selectedMood: {
    backgroundColor: '#2196F3',
  },
  moodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AddEntry;