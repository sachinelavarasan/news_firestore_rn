import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React, { memo, useMemo } from "react";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";

const NewsItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", {
          news: item,
          isFavoriteScreen: false,
        });
      }}
    >
      <View style={[styles.container, styles.shadowProp]}>
        <Image
          source={{ uri: item.urlToImage }}
          style={{ height: 150, width: "100%", borderRadius: 10 }}
        />
        <Text style={styles.text}>{item.title}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.date}>
            Published on : {moment(item.publishedAt).format("DD MMMM YYYY")}
          </Text>

          <Entypo name="chevron-right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(NewsItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 15,
    alignSelf: "center",
    width: "100%",
    borderRadius: 6,
    marginVertical: 5,
  },
  text: {
    marginTop: 10,
    color: "black",
    fontSize: 16,
    fontWeight: "900",
  },
  date: {
    color: "gray",
    fontSize: 14,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
