import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useStore } from "@/store/useStore";
import { styles } from "./add-group.styles";

export default function AddGroupScreen() {
  const router = useRouter();
  const addGroup = useStore((s) => s.addGroup);

  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState<{ id: string; name: string }[]>([]);

  const handleAddMember = () => {
    if (!memberName.trim()) return;
    setMembers((prev) => [
      ...prev,
      { id: Date.now().toString(), name: memberName.trim() },
    ]);
    setMemberName("");
  };

  const handleCreateGroup = () => {
    if (!groupName || members.length === 0) return;
    addGroup({
      id: Date.now().toString(),
      name: groupName,
      members,
      expenses: [],
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Group Name"
        value={groupName}
        onChangeText={setGroupName}
        style={styles.input}
      />

      <TextInput
        placeholder="Add Member Name"
        value={memberName}
        onChangeText={setMemberName}
        style={styles.input}
      />

      <Pressable style={styles.addBtn} onPress={handleAddMember}>
        <Text style={styles.addBtnText}>+ Add Member</Text>
      </Pressable>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ color: "#fff" }}>• {item.name}</Text>
        )}
        style={{ marginTop: 12 }}
      />

      <Pressable style={styles.createBtn} onPress={handleCreateGroup}>
        <Text style={styles.createBtnText}>Create Group</Text>
      </Pressable>
    </View>
  );
}

