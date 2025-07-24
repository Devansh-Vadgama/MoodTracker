import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { loadMoods } from '../../utils/storage';

export default function MoodHistoryScreen() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    loadMoods().then(setMoods);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood History</Text>
      <FlatList
        data={moods}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.label}>{item.emoji} {item.label}</Text>
            {item.note && <Text style={styles.note}>“{item.note}”</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f2f6fc' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  date: { fontSize: 14, color: '#999' },
  label: { fontSize: 18, fontWeight: '600', marginVertical: 4 },
  note: { fontStyle: 'italic', color: '#444' }
});