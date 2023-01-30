import React, { useEffect, useReducer } from "react";
import { View, StyleSheet } from "react-native";

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

import useAuthHook from "../hooks/useAuthHook";

const SigninScreen = ({ navigation }) => {
  const { state, signIn, dispatch } = useAuthHook(navigation);

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
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signIn}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="Signup"
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

export default SigninScreen;
