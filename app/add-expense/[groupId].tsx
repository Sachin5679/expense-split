import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import { useStore } from "@/store/useStore";

export default function AddExpenseScreen() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const router = useRouter();

  const group = useStore((s) => s.groups.find((g) => g.id === groupId));
  const addExpense = useStore((s) => s.addExpense);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState<string | null>(null);
  const [splitBetween, setSplitBetween] = useState<string[]>([]);

  if (!group) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          Group not found!
        </Text>
      </View>
    );
  }

  const toggleSplitMember = (memberId: string) => {
    setSplitBetween((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSave = () => {
    if (!title || !amount || !paidBy || splitBetween.length === 0) {
      Alert.alert("Please fill all fields");
      return;
    }

    addExpense(groupId, {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      timestamp: new Date().toISOString(),
      paidBy,
      splitBetween,
    });

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Paid By</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={paidBy}
          onValueChange={(itemValue) => setPaidBy(itemValue)}
        >
          <Picker.Item label="Select payer" value={null} />
          {group.members.map((member) => (
            <Picker.Item
              key={member.id}
              label={member.name}
              value={member.id}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Split Between</Text>
      {group.members.map((member) => (
        <View key={member.id} style={styles.checkboxRow}>
          <Checkbox
            value={splitBetween.includes(member.id)}
            onValueChange={() => toggleSplitMember(member.id)}
            color={splitBetween.includes(member.id) ? "#4CAF50" : undefined}
          />
          <Text style={styles.checkboxLabel}>{member.name}</Text>
        </View>
      ))}

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1a1a1a",
    flexGrow: 1,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  label: {
    color: "#ccc",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
  },
  pickerWrapper: {
    backgroundColor: "#333",
    borderRadius: 6,
    marginBottom: 16,
    overflow: "hidden",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: "#fff",
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
    fontWeight: "bold",
    fontSize: 16,
  },
});
