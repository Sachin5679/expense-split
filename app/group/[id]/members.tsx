import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useStore } from "@/store/useStore";
import { styles } from "./members.styles";


export default function MembersScreen() {
  const { id } = useLocalSearchParams();
  const group = useStore((state) => state.groups.find((g) => g.id === id));

  if (!group) return <Text style={styles.error}>Group not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members of {group.name}</Text>

      <FlatList
        data={group.members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No members found.</Text>}
      />
    </View>
  );
}


