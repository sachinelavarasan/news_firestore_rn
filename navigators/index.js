import * as Animatable from "react-native-animatable";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import HomeScreen from "../screen/HomeScreen";
import FavoriteScreen from "../screen/FavoriteScreen";
import Icon, { Icons } from "../components/Icons";
import AccountScreen from "../screen/AccountScreen";

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};
const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

export const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;

  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon
            type={item.iconType}
            name={item.icon}
            color={focused ? "#FFFDE3" : "black"}
          />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[styles.text, { color: "black" }]}
        >
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export const tabs = [
  {
    name: "List",
    component: HomeScreen,
    route: "Home",
    label: "Home",
    icon: "news",
    iconType: Icons.Entypo,
  },
  {
    name: "Favorites",
    component: FavoriteScreen,
    route: "Favorite",
    label: "Favorite",
    icon: "favorite",
    iconType: Icons.MaterialIcons,
  },
  {
    name: "Account",
    component: AccountScreen,
    route: "Account",
    label: "Account",
    icon: "account-circle",
    iconType: Icons.MaterialIcons,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#C21010",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E64848",
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
});
