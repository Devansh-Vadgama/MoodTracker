// app/+not-found.tsx

import { View, Text, StyleSheet } from 'react-native';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>404 - Page Not Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012D14',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#A0F0A0',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
