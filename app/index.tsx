import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { Link } from "expo-router";
import { useStore } from "@/./store/useStore";
import GroupCard from "@/./components/GroupCard";
import { styles } from "./index.styles";

export default function Index() {
  const { groups } = useStore();

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
              params: { id: item.id },
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

      <Link href="/add-group" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>+ Create New Group</Text>
        </Pressable>
      </Link>
    </View>
  );
}


