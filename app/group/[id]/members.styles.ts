import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  memberItem: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  memberText: {
    color: "#fff",
    fontSize: 16,
  },
  empty: {
    color: "#bbb",
    marginTop: 40,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    padding: 20,
    textAlign: "center",
  },
});