import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const moods = ['All', 'Amazing', 'Happy', 'Neutral', 'Sad', 'Angry'];

export default function HistoryScreen() {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeMood, setActiveMood] = useState('All');

  const loadMoods = async () => {
    const data = await AsyncStorage.getItem('moodHistory');
    if (data) {
      const parsed = JSON.parse(data).reverse(); // latest first
      setEntries(parsed);
      setFiltered(parsed);
    }
  };

  useEffect(() => {
    loadMoods();
  }, []);

  const filterByMood = (mood) => {
    setActiveMood(mood);
    if (mood === 'All') {
      setFiltered(entries);
    } else {
      const filtered = entries.filter((entry) => entry.label === mood);
      setFiltered(filtered);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>Mood History</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[styles.chip, activeMood === mood && styles.activeChip]}
            onPress={() => filterByMood(mood)}>
            <Text style={styles.chipText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filtered.length === 0 ? (
        <Text style={{ color: '#78C5A1', textAlign: 'center', marginTop: 30 }}>No entries found.</Text>
      ) : (
        filtered.map((entry, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.emoji}>{entry.mood}</Text>
            <View>
              <Text style={styles.label}>{entry.label}</Text>
              <Text style={styles.date}>{entry.date}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A', // Dark navy blue
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4FC3F7', // Light blue title
    marginBottom: 10,
  },
  filterRow: {
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#1B263B', // Darker blue for unselected chip
    borderRadius: 20,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: '#1565C0', // Active chip highlight (blue)
  },
  chipText: {
    color: '#BBDEFB', // Light text
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A5F', // Mood card background
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: '#BBDEFB', // Light blue label
    fontWeight: 'bold',
  },
  date: {
    fontSize: 13,
    color: '#90CAF9', // Soft blue
  },
});
