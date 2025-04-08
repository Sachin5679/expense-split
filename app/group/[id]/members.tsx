// File: app/group/[id]/members.tsx
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useStore } from "@/store/useStore";

export default function MembersScreen() {
  const { id } = useLocalSearchParams();
  const group = useStore((state) => state.groups.find((g) => g.id === id));

  if (!group) return <Text style={styles.error}>Group not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members of {group.name}</Text>

      <FlatList
        data={group.members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No members found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  memberItem: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  memberText: {
    color: "#fff",
    fontSize: 16,
  },
  empty: {
    color: "#bbb",
    marginTop: 40,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    padding: 20,
    textAlign: "center",
  },
});
