import { StyleSheet, Text, View } from "react-native";

export default function Subtitle({ children }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subTitle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitleContainer: {
    marginHorizontal: 8,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#e2b497",
    fontSize: 18,
    padding: 6,
    margin: 4,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
    textAlign: "center",
  },
});

