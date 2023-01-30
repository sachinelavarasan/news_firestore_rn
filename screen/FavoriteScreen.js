import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import FavoriteItem from "../components/FavoriteItem";

import {
  db,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "../firebase";
import useAuthHook from "../hooks/useAuthHook";

const FavoriteScreen = ({ navigation }) => {
  const favoritesRef = collection(db, "favorites");

  const { state, dispatch } = useAuthHook(navigation);

  const getShoppingList = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("@user"));
    const q = query(favoritesRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    dispatch({
      type: "all_fav_items",
      payload: [
        ...querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      ],
    });
  };

  const deleteAllFavorite = async () => {
    try {
      const querySnapshot = await getDocs(favoritesRef);

      querySnapshot.docs.map((item) =>
        deleteDoc(doc(db, "favorites", item.id))
      );
      dispatch({
        type: "remove_all_fav_items",
        payload: [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getShoppingList();
    });
    return unsubscribe;
  }, [navigation, state]);

  return (
    <SafeAreaView style={styles.container}>
      <Header deletAll={deleteAllFavorite} count={state.favItems.length} />
      <FlatList
        data={state.favItems}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavoriteItem
            item={item}
            id={item.id}
            dispatch={dispatch}
            navigation={navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 220, 220)",
  },
});
