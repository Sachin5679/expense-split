import { View, Text, StyleSheet } from "react-native";
import { Group } from "@/./types/types";

export default function GroupCard({ group }: { group: Group }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{group.name}</Text>
      <Text style={styles.members}>{group.members.length} members</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  members: {
    color: "#bbb",
  },
});
