import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { db, doc, deleteDoc } from "../firebase";

const FavoriteItem = ({ item, id, dispatch, navigation }) => {
  const deleteData = async () => {
    try {
      await deleteDoc(doc(db, "favorites", id));
      dispatch({
        type: "remove_one_fav_item",
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", { news: item, isFavoriteScreen: true });
      }}
      style={[styles.container, styles.shadowProp]}
    >
      <View>
        <Image
          source={{ uri: item.urlToImage }}
          style={{ height: 150, width: "100%", borderRadius: 10 }}
        />
        <Text style={styles.text} numberOfLines={3}>
          {item.title}
        </Text>

        <TouchableOpacity
          onPress={() => {
            deleteData();
          }}
          style={{ alignSelf: "center", marginTop: 5 }}
        >
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default memo(FavoriteItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flexDirection: "column",
    padding: 15,
    margin: 10,
    flex: 1,
    borderRadius: 6,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    marginVertical: 5,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
