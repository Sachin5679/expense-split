import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useStore } from "@/./store/useStore";
import ExpenseCard from "@/./components/ExpenseCard";
import { Link } from "expo-router";
import { calculateBalance } from "@/utils/calculateBalance";

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams();
  const group = useStore((state) => state.groups.find((g) => g.id === id));

  if (!group) return <Text style={styles.error}>Group not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.name}</Text>

      <Text style={styles.subtitle}>Members</Text>
      {group.members.map((member) => (
        <Text key={member.id} style={styles.memberText}>
          • {member.name}
        </Text>
      ))}

      <FlatList
        data={group.expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseCard expense={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No expenses yet.</Text>}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Summary:
        </Text>
        {Object.entries(calculateBalance(group)).map(([memberId, balance]) => {
          const member = group.members.find((m) => m.id === memberId);
          return (
            <Text key={memberId} style={{ color: "#ccc", marginBottom: 4 }}>
              {member?.name || "Unknown"}: ₹{balance.toFixed(2)}
            </Text>
          );
        })}
      </View>

      <Link
        href={{ pathname: "/add-expense/[groupId]", params: { groupId: group.id } } as const}
        asChild
      >
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>+ Add Expense</Text>
        </Pressable>
      </Link>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    marginBottom: 8,
  },
  memberText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
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
