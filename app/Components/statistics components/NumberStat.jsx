import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "native-base";
export default function NumberStat({
  number,
  Title,
  IconName,
  IconType,
  iconSize,
}) {
  return (
    <View style={styles.StatContainer}>
      <Icon
        as={IconType}
        name={IconName}
        color="#fff"
        size={iconSize ? iconSize : 5}
      />
      <View style={styles.DataContainer}>
        <Text style={styles.title}>{number}</Text>
        <Text style={styles.title}>{Title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  DataContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
  StatContainer: {
    width: 183,
    height: 45,
    backgroundColor: "#348578",
    borderRadius: 7,
    shadowColor: "#000",
    elevation: 1.5,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Tajawal-Medium",
  },
});
