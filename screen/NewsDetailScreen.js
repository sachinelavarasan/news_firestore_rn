import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { db, collection, addDoc, getDocs, query, where } from "../firebase";

import * as WebBrowser from "expo-web-browser";
import useAuthHook from "../hooks/useAuthHook";

const NewsDetailScreen = ({ route, navigation }) => {
  const { news, isFavoriteScreen } = route.params;
  const { state, dispatch } = useAuthHook(navigation);
  const [favorite, setFavorite] = useState(false);
  const favoritesRef = collection(db, "favorites");

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

  useEffect(() => {
    const findData = state?.favItems.find((data) => data.url === news.url);
    if (findData) {
      setFavorite(true);
    }
  }, [state, news]);

  const handlePressButtonAsync = () => {
    WebBrowser.openBrowserAsync(news.url);
  };

  const addToFavorite = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("@user"));
      await addDoc(collection(db, "favorites"), {
        ...news,
        userId: user.uid,
      });
      setFavorite(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getShoppingList();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text style={styles.header}>{news.title}</Text>
        {!isFavoriteScreen ? (
          <TouchableOpacity
            onPress={() => {
              if (!favorite) {
                addToFavorite();
              }
            }}
            style={{ alignSelf: "flex-end", marginTop: 10 }}
          >
            {!favorite ? (
              <MaterialIcons name="favorite-outline" size={24} color="black" />
            ) : (
              <MaterialIcons name="favorite" size={24} color="black" />
            )}
          </TouchableOpacity>
        ) : null}
        <Image
          source={{ uri: news.urlToImage }}
          resizeMode="cover"
          style={{
            height: 200,
            width: 200,
            borderRadius: 10,
            marginVertical: 10,
            alignSelf: "center",
          }}
        />
        <Text style={styles.title}>Description</Text>
        <Text style={styles.description}>{news.description}</Text>
      </View>
      <Text style={styles.title}>Content</Text>
      <Text style={styles.content}>{news.content}</Text>
      <Text style={styles.date}>
        Published on : {moment(news.publishedAt).format("d/MM/yyyy")}
      </Text>
      <TouchableOpacity onPress={handlePressButtonAsync}>
        <Text style={styles.link}>See article</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 220, 220)",
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    padding: 15,
    fontSize: 18,
    marginBottom: 25,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
  },
  content: {
    fontSize: 18,
    fontWeight: "400",
    marginVertical: 10,
  },
  description: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  date: {
    color: "gray",
    fontSize: 14,
    marginTop: 10,
  },
});
