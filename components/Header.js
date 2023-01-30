import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ deletAll, count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Favorites</Text>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity onPress={deletAll}>
        <MaterialIcons name="delete" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignSelf: "center",
    alignItems: "center",
    width: "95%",
    borderRadius: 6,
  },
  text: {
    fontSize: 24,
    flex: 1,
    fontWeight: "bold",
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 20,
  },
});
