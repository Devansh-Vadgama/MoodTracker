import { SafeAreaView, Text, Button, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { loadMoods } from '../../utils/storage';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen() {
  const router = useRouter();
  const [todayMood, setTodayMood] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadMoods().then(moods => {
      const today = new Date().toDateString();
      const mood = moods.find(entry => entry.date === today);
      setTodayMood(mood);
    });
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Mood Tracker</Text>
      <View style={styles.card}>
        {todayMood ? (
          <Text style={styles.moodText}>
            Today's Mood: {todayMood.emoji} {todayMood.label}
          </Text>
        ) : (
          <Button title="Log Today’s Mood" onPress={() => router.push('/log')} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f2f6fc' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  moodText: { fontSize: 18, fontWeight: '500' }
});