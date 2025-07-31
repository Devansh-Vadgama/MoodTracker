import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';

const moods = [
  { label: 'Amazing', emoji: '🤩' },
  { label: 'Happy', emoji: '😊' },
  { label: 'Neutral', emoji: '😐' },
  { label: 'Sad', emoji: '😢' },
  { label: 'Angry', emoji: '😠' },
];

export default function LogMood() {
  const [selected, setSelected] = useState('Amazing');
  const [note, setNote] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    const mood = moods.find((m) => m.label === selected);
    const newEntry = {
      mood: mood?.emoji || '',
      label: selected,
      note,
      date: format(new Date(), 'EEEE, MMMM d'),
    };

    try {
      const existing = await AsyncStorage.getItem('moodHistory');
      const history = existing ? JSON.parse(existing) : [];
      history.push(newEntry);
      await AsyncStorage.setItem('moodHistory', JSON.stringify(history));
      router.back(); // Go back to home
    } catch (err) {
      console.error('Failed to save mood:', err);
      Alert.alert('Error', 'Could not save your mood.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Your Mood</Text>
      <Text style={styles.subtitle}>Take a moment to check in with yourself.</Text>

      <Text style={styles.question}>How are you feeling?</Text>
      <View style={styles.moodRow}>
        {moods.map((m) => (
          <TouchableOpacity
            key={m.label}
            style={[styles.moodItem, selected === m.label && styles.moodSelected]}
            onPress={() => setSelected(m.label)}>
            <Text style={styles.emoji}>{m.emoji}</Text>
            <Text style={styles.moodLabel}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="What's on your mind today?"
        placeholderTextColor="#74c1deff"
        value={note}
        onChangeText={setNote}
        maxLength={200}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update Mood</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0D1B2A', // Dark navy background
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4FC3F7', // Light blue
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#81D4FA', // Softer blue
    marginBottom: 20,
  },
  question: {
    color: '#4FC3F7',
    fontSize: 16,
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  moodSelected: {
    backgroundColor: '#1565C0', // Blue highlight
  },
  emoji: {
    fontSize: 30,
  },
  moodLabel: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1565C0', // Match selection color
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    fontSize: 14,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E88E5', // Primary blue
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

