import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React, { useEffect } from "react";
import useAuthHook from "../hooks/useAuthHook";
import Spacer from "../components/Spacer";

const AccountScreen = ({ navigation }) => {
  const { state, signOutAccount, fetchUserDetail } = useAuthHook(navigation);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Account Screen</Text>
        <Spacer>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>
            {state.user?.email}
          </Text>
        </Spacer>

        <TouchableOpacity
          onPress={signOutAccount}
          style={{
            backgroundColor: "black",
            padding: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(220, 220, 220)",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  box: {
    width: "60%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
});
