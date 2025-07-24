import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'MOOD_ENTRIES';

export const saveMood = async (mood) => {
  const existing = await loadMoods();
  const updated = [mood, ...existing.filter(e => e.date !== mood.date)];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const loadMoods = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};