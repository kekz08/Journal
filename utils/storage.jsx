import AsyncStorage from '@react-native-async-storage/async-storage';

// Save journal entries
export const saveEntries = async (entries) => {
  try {
    const jsonEntries = JSON.stringify(entries);
    await AsyncStorage.setItem('journalEntries', jsonEntries);
  } catch (e) {
    console.error('Failed to save entries:', e);
  }
};

// Load journal entries
export const loadEntries = async () => {
  try {
    const jsonEntries = await AsyncStorage.getItem('journalEntries');
    return jsonEntries != null ? JSON.parse(jsonEntries) : [];
  } catch (e) {
    console.error('Failed to load entries:', e);
  }
};

// Save categories
export const saveCategories = async (categories) => {
  try {
    const jsonCategories = JSON.stringify(categories);
    await AsyncStorage.setItem('categories', jsonCategories);
  } catch (e) {
    console.error('Failed to save categories:', e);
  }
};

// Load categories
export const loadCategories = async () => {
  try {
    const jsonCategories = await AsyncStorage.getItem('categories');
    return jsonCategories != null ? JSON.parse(jsonCategories) : [];
  } catch (e) {
    console.error('Failed to load categories:', e);
  }
};