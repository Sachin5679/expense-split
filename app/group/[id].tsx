import { View, Text, StyleSheet, Pressable, FlatList, TextInput, Modal } from "react-native";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import { styles } from "./[id].styles";


export default function GroupScreen() {
  const { id } = useLocalSearchParams();
  const group = useStore((s) => s.groups.find((g) => g.id === id));
  const deleteGroup = useStore((s) => s.deleteGroup);
  const renameGroup = useStore((s) => s.renameGroup);
  const router = useRouter();
  const [showMembers, setShowMembers] = useState(false);
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  if (!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Group not found</Text>
      </View>
    );
  }

  const calculateBalances = () => {
    const balances: Record<string, number> = {};

    group.expenses.forEach((expense) => {
      const share = expense.amount / expense.splitBetween.length;

      expense.splitBetween.forEach((member) => {
        balances[member] = (balances[member] || 0) - share;
      });

      balances[expense.paidBy] = (balances[expense.paidBy] || 0) + expense.amount;
    });

    return balances;
  };

  const balances = calculateBalances();

  return (
    <View style={styles.container}>
      {/* Title with Edit Icon */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{group.name}</Text>
        <Pressable onPress={() => setRenameModalVisible(true)} style={styles.editIcon}>
          <Feather name="edit" size={20} color="#4CAF50" />
        </Pressable>
      </View>

      <View style={styles.membersContainer}>
  <Pressable onPress={() => setShowMembers(!showMembers)} style={styles.toggleHeader}>
    <Text style={styles.sectionTitle}>Members</Text>
    <Feather
      name={showMembers ? "chevron-up" : "chevron-down"}
      size={20}
      color="#fff"
    />
  </Pressable>

  {showMembers && (
    <View style={styles.cardContainer}>
      {group.members.length === 0 ? (
        <Text style={styles.member}>No members added.</Text>
      ) : (
        group.members.map((member, index) => (
          <View key={index} style={styles.memberRow}>
            <Feather name="user" size={16} color="#aaa" style={{ marginRight: 6 }} />
            <Text style={styles.member}>
              {typeof member === "string" ? member : member.name}
            </Text>
          </View>
        ))
      )}
    </View>
  )}
</View>


{/* Balances */}
<View style={styles.balancesContainer}>
  <Text style={styles.sectionTitle}>Group Balance Summary:</Text>
  {Object.entries(balances).map(([memberId, balance]) => {
    const member = group.members.find((m) => m.id === memberId);
    const isPositive = balance >= 0;
    return (
      <View key={memberId} style={[styles.balanceRow, { backgroundColor: "#2a2a2a" }]}>
        <Feather
          name={isPositive ? "arrow-down-left" : "arrow-up-right"}
          size={16}
          color={isPositive ? "#4CAF50" : "#ff4d4d"}
          style={{ marginRight: 6 }}
        />
        <Text style={styles.balanceText}>
          {member?.name || memberId}:{" "}
          <Text style={{ color: isPositive ? "#4CAF50" : "#ff4d4d" }}>
            {isPositive ? `is owed ₹${balance.toFixed(2)}` : `owes ₹${(-balance).toFixed(2)}`}
          </Text>
        </Text>
      </View>
    );
  })}
</View>


      {/* Expenses List */}
      <Text style={styles.sectionTitle}>Expenses:</Text>
      <FlatList
        data={group.expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
            const payer = group.members.find((member) => member.id === item.paidBy);
            const payerName = payer ? payer.name : item.paidBy;
          
            return (
              <View style={styles.expenseItem}>
                <Text style={styles.expenseTitle}>{item.title}</Text>
                <Text style={styles.expenseDetails}>
                  ₹{item.amount.toFixed(2)} paid by {payerName}
                </Text>
              </View>
            );
          }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses yet.</Text>
        }
      />

      {/* Add Expense Button */}
      <Link href={`/add-expense/${group.id}`} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>+ Add Expense</Text>
        </Pressable>
      </Link>

      {/* Delete Group Button */}
      <Pressable
        onPress={() => {
          deleteGroup(group.id);
          router.replace("/");
        }}
        style={styles.deleteButton}
      >
        <Feather name="trash-2" size={18} color="#fff" />
        <Text style={styles.deleteButtonText}> Delete Group</Text>
      </Pressable>

      {/* Rename Modal */}
      <Modal
        visible={isRenameModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRenameModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ color: "#fff", fontSize: 16, marginBottom: 8 }}>
              Enter new group name:
            </Text>
            <TextInput
              value={newGroupName}
              onChangeText={setNewGroupName}
              style={styles.input}
              placeholder="New name"
              placeholderTextColor="#999"
            />
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                if (newGroupName.trim()) {
                  renameGroup(group.id, newGroupName.trim());
                  setRenameModalVisible(false);
                  setNewGroupName("");
                }
              }}
            >
              <Text style={styles.modalButtonText}>Rename</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

