import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { moods } from '../../constants/moods';
import { saveMood } from '../../utils/storage';
import { useRouter } from 'expo-router';

export default function LogMoodScreen() {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!selected) return alert("Please select a mood!");
    await saveMood({
      ...selected,
      note,
      date: new Date().toDateString()
    });
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How are you feeling today?</Text>
      <View style={styles.moodList}>
        {moods.map((m, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.moodItem, selected === m && styles.selectedMood]}
            onPress={() => setSelected(m)}
          >
            <Text style={styles.moodText}>{m.emoji} {m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder="Add a note (optional)"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />
      <Button title="Save Mood" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  moodList: { marginBottom: 16 },
  moodItem: {
    backgroundColor: '#f0f0f0',
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
  },
  selectedMood: { backgroundColor: '#d0e9ff' },
  moodText: { fontSize: 18 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  }
});