import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function CreateModal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Something New</Text>

      {/* Your form or creation UI goes here */}

      <Button title="Close Modal" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
