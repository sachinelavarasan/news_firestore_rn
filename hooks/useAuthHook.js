import { useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import { initialValues, reducer } from "../reducer";

export default (navigation) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const signIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // r
        const { uid, accessToken, providerData } = userCredential.user;

        const { displayName, email, phoneNumber, photoURL } = providerData[0];
        const user = {
          uid,
          accessToken,
          phoneNumber,
          photoURL,
          email,
          displayName,
        };

        await AsyncStorage.setItem("@user", JSON.stringify(user));
        await AsyncStorage.setItem("@token", accessToken);
        dispatch({
          type: "user",
          payload: user,
        });
        navigation.navigate("Home");
      })
      .catch(() => {
        dispatch({
          type: "error_auth",
          payload: "Invalid credentials",
        });
      });
  };

  const signUp = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // r
        const { uid, accessToken, providerData } = userCredential.user;

        const { displayName, email, phoneNumber, photoURL } = providerData[0];
        const user = {
          uid,
          accessToken,
          phoneNumber,
          photoURL,
          email,
          displayName,
        };

        await AsyncStorage.setItem("@user", JSON.stringify(user));
        await AsyncStorage.setItem("@token", accessToken);
        dispatch({
          type: "user",
          payload: user,
        });
        navigation.navigate("Home");
      })
      .catch(() => {
        dispatch({
          type: "error_auth",
          payload: "Something went wrong",
        });
      });
  };

  const signOutAccount = () => {
    signOut(auth)
      .then(async () => {
        await AsyncStorage.removeItem("@user");
        await AsyncStorage.removeItem("@token");
        dispatch({
          type: "user",
          payload: null,
        });
        navigation.navigate("Signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tryLocalSignin = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("@token");
      const user = await AsyncStorage.getItem("@user");
      dispatch({
        type: "user",
        payload: JSON.parse(user),
      });
      if (accessToken) {
        navigation.navigate("Home");
      } else {
        dispatch({
          type: "user",
          payload: null,
        });
        navigation.navigate("Signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUserDetail = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");

      dispatch({
        type: "user",
        payload: JSON.parse(user),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    state,
    dispatch,
    signIn,
    signUp,
    signOutAccount,
    tryLocalSignin,
    fetchUserDetail,
  };
};
