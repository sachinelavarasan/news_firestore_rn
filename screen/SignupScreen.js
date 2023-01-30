import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import useAuthHook from "../hooks/useAuthHook";

const SignupScreen = ({ navigation }) => {
  const { state, signUp, dispatch } = useAuthHook(navigation);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch({
        type: "error",
        payload: null,
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signUp}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SignupScreen;
