import { StyleSheet, TextInput } from "react-native";
import React from "react";

const TextInputComponent = ({ text, onChange, onSubmit }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Type here!"
      onChangeText={onChange}
      defaultValue={text}
      onSubmitEditing={onSubmit}
    />
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  input: {
    width: "95%",
    padding: 12,
    alignSelf: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 5,
    fontSize: 16,
    marginTop: "auto",
  },
});
