import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EntryForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [mood, setMood] = useState(initialValues?.mood || 'Neutral');

  // Update form fields when initialValues change (for editing)
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setContent(initialValues.content);
      setMood(initialValues.mood);
    }
  }, [initialValues]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button
        title={initialValues ? 'Update Entry' : 'Save Entry'}
        onPress={() => onSubmit({ title, content, mood })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 16, borderWidth: 1, padding: 8 },
});

export default EntryForm;