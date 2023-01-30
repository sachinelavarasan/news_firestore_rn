import React from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

export const Icons = {
  MaterialIcons,
  Entypo,
};

const Icon = ({ type, name, color, size = 24, style }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};

export default Icon;
