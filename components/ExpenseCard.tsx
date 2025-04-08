import { View, Text, StyleSheet } from "react-native";
import { Expense } from "@/../../types/types";
import React from "react";
import { styles } from "./ExpenseCard.styles";


export default function ExpenseCard({ expense }: { expense: Expense }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{expense.title}</Text>
      <Text style={styles.amount}>₹{expense.amount.toFixed(2)}</Text>
      <Text style={styles.time}>{new Date(expense.timestamp).toLocaleString()}</Text>
    </View>
  );
}

