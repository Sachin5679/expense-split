import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useStore } from "@/./store/useStore";

export default function AddExpenseScreen() {
  const { groupId } = useLocalSearchParams();
  const router = useRouter();
  const addExpense = useStore((s) => s.addExpense);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    if (!title || !amount) return;

    addExpense(groupId as string, {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      timestamp: new Date().toISOString(),
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a1a",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
