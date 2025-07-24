import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';
import { loadMoods } from '../../utils/storage';
import { moods } from '../../constants/moods';

export default function MoodStatsScreen() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    loadMoods().then(entries => {
      const countMap = {};
      moods.forEach(m => countMap[m.label] = 0);
      entries.forEach(e => countMap[e.label]++);
      setCounts(countMap);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Statistics</Text>
      <BarChart
        data={{
          labels: Object.keys(counts),
          datasets: [{ data: Object.values(counts) }]
        }}
        width={Dimensions.get('window').width - 40}
        height={250}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(47, 149, 220, ${opacity})`,
          labelColor: () => '#333'
        }}
        style={{ borderRadius: 12 }}
        verticalLabelRotation={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f2f6fc' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});