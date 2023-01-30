import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SelectBox = ({ onChange, data, value, title = "" }) => {
  return (
    <>
      <Text style={{ fontSize: 16, marginVertical: 10, fontWeight: "500" }}>
        {title}
      </Text>
      <View
        style={{
          backgroundColor: "white",
          height: 50,
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "10",
        }}
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          pickerStyleType={styles.picker}
        >
          {data.map((item, index) => (
            <Picker.Item
              key={index.toString()}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </>
  );
};
export default SelectBox;

const styles = StyleSheet.create({
  picker: {
    marginVertical: 30,
    width: 300,
  },
});
