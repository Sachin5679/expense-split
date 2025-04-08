import { View, Text, StyleSheet } from "react-native";
import { Group } from "@/./types/types";
import { styles } from "./GroupCard.styles";


export default function GroupCard({ group }: { group: Group }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{group.name}</Text>
      <Text style={styles.members}>{group.members.length} members</Text>
    </View>
  );
}

