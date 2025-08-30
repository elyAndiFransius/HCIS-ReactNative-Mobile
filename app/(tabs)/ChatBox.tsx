import { View, Text, StyleSheet } from 'react-native';

export default function ChatBox() {
  return (
    <View style={styles.container}>
      <Text>Ini ChatBox</Text>
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
