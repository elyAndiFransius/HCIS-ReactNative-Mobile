import { View, Text, StyleSheet } from 'react-native';

export default function Jadwal() {
  return (
    <View style={styles.container}>
      <Text>Ini Jadwal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
