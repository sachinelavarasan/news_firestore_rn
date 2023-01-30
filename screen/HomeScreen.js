import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import instance from "../api/axios";
import NewsItem from "../components/NewsItems";
import OverlayComponent from "../components/OverlayComponent";
import SelectBox from "../components/SelectBox";
import Spacer from "../components/Spacer";
import { getDocs, query, where, collection, db } from "../firebase";

import { categories, country } from "../utils";
import useAuthHook from "../hooks/useAuthHook";

export const HomeScreen = ({ navigation }) => {
  const favoritesRef = collection(db, "favorites");
  const { state, dispatch } = useAuthHook(navigation);

  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedCountry, setSelectedCountry] = useState("in");
  const [show, setShow] = useState(false);

  const getNewsList = async () => {
    try {
      const resp = await instance.get("/top-headlines?pageSize=30", {
        params: {
          category: selectedCategory,
          country: selectedCountry,
          sortBy: "publishedAt",
        },
      });
      dispatch({
        type: "all_items",
        payload: resp.data.articles,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNewsList();
  }, [navigation]);

  const ItemComp = ({ item, navigation }) => (
    <NewsItem item={item} navigation={navigation} />
  );

  const toggleShow = () => {
    setShow(!show);
  };

  const applyFilter = useCallback(() => {
    getNewsList();
    toggleShow();
  }, [selectedCategory, selectedCountry]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>News List</Text>
          <TouchableOpacity onPress={toggleShow} style={styles.button}>
            <FontAwesome name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <OverlayComponent show={show} toggleOverlay={toggleShow}>
          <SelectBox
            data={categories}
            onChange={(value) => {
              setSelectedCategory(value);
            }}
            value={selectedCategory}
            title="Select Category"
          />
          <SelectBox
            data={country}
            onChange={(value) => {
              setSelectedCountry(value);
            }}
            value={selectedCountry}
            title="Select Country"
          />
          <Spacer>
            <Button
              title="Apply filters"
              onPress={applyFilter}
              buttonStyle={styles.button}
            />
          </Spacer>
        </OverlayComponent>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={state.newsItems}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <ItemComp item={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 220, 220)",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 15,
    height: 50,
    width: 50,
    borderRadius: 8,
    marginBottom: 15,
  },
});
