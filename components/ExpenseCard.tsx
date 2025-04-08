import { View, Text, StyleSheet } from "react-native";
import { Expense } from "@/./types/types";

export default function ExpenseCard({ expense }: { expense: Expense }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{expense.title}</Text>
      <Text style={styles.amount}>₹{expense.amount.toFixed(2)}</Text>
      <Text style={styles.time}>{new Date(expense.timestamp).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  amount: {
    color: "#4CAF50",
    fontSize: 14,
  },
  time: {
    color: "#999",
    fontSize: 12,
  },
});