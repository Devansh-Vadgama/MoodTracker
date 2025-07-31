import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useCallback } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const today = format(new Date(), 'EEEE, MMMM d');

  const [latestMood, setLatestMood] = useState<{ mood: string; label: string; date: string } | null>(null);

  // Load last mood whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadLatestMood = async () => {
        const data = await AsyncStorage.getItem('moodHistory');
        if (data) {
          const history = JSON.parse(data);
          const last = history[history.length - 1];
          setLatestMood(last);
        } else {
          setLatestMood(null);
        }
      };
      loadLatestMood();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>
      <Text style={styles.subtitle}>How are you feeling today?</Text>

      {latestMood ? (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardDate}>Today</Text>
            <TouchableOpacity onPress={() => router.push('/log')}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.emoji}>{latestMood.mood}</Text>
          <Text style={styles.moodLabel}>{latestMood.label}</Text>
          <Text style={styles.cardDate}>{latestMood.date}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.noRecentCard} onPress={() => router.push('/log')}>
          <Ionicons name="time-outline" size={24} color="#A0F0A0" />
          <Text style={styles.noRecentTitle}>No Recent Moods</Text>
          <Text style={styles.noRecentSub}>Start tracking daily to see your mood patterns here.</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A', // Dark blue background
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4FC3F7', // Light blue heading
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#81D4FA', // Softer blue subtitle
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1565C0', // Deep blue card background
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDate: {
    color: '#ffffff',
    fontSize: 14,
  },
  editText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginVertical: 10,
  },
  moodLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  noRecentCard: {
    backgroundColor: '#102840', // Muted navy
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  noRecentTitle: {
    color: '#4FC3F7', // Accent blue
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  noRecentSub: {
    color: '#BBDEFB', // Soft blue text
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});

