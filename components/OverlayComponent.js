import React, { Children, useState } from "react";
import { Button, Overlay, Icon } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

const OverlayComponent = ({ children, show, toggleOverlay }) => {
  return (
    <Overlay
      isVisible={show}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.container}
    >
      <View style={styles.view}>{children}</View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 400,
  },
  view: {
    backgroundColor: "rgb(224, 224, 224)",
    padding: 15,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});

export default OverlayComponent;
