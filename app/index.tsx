import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { Link } from "expo-router";
import { useStore } from "@/./store/useStore";
import GroupCard from "@/./components/GroupCard";

export default function Index() {
  const { groups, addGroup } = useStore();

  const handleAddGroup = () => {
    const newGroup = {
      id: Date.now().toString(),
      name: `Group ${groups.length + 1}`,
      members: [],
      expenses: [],
    };
    addGroup(newGroup);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Groups</Text>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
<Link
  href={{
    pathname: "/group/[id]",
    params: { id: item.id }
  }}
  asChild
>
  <Pressable>
    <GroupCard group={item} />
  </Pressable>
</Link>


        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No groups yet. Add one!</Text>
        }
      />

      <Pressable style={styles.button} onPress={handleAddGroup}>
        <Text style={styles.buttonText}>+ Create New Group</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
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
  emptyText: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
