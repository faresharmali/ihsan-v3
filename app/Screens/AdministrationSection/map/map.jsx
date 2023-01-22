import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomBar from "../../../Navigation/BottomBar";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Entypo,
   
} from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { getFamilies } from "../../../api/family";
import { useDispatch } from "react-redux";
import NavigateToFamily from "../../maps/navigateToFamily";
export default function FamiliesMap({ navigation, drawer }) {
  const dispatch = useDispatch();
  const [famillies, setfamillies] = useState([]);
  const [Displayedfamillies, setDisplayedfamillies] = useState([]);

  let MyFamilies = useSelector((state) => state.Families);
  const updateState = (data) => {
    return {
      type: "updateFamiliesList",
      data: data,
    };
  };
  useEffect(() => {
    setfamillies(MyFamilies);
    setDisplayedfamillies(MyFamilies);
  }, [MyFamilies]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getFamilies();
      dispatch(
        updateState(
          res.data.result.map((f) => ({
            ...f,
            title:
              f.motherFullName +
              " " +
              f.fatherFirstName +
              " " +
              f.fatherLastName,
          }))
        )
      );
    });

    return unsubscribe;
  }, [navigation]);


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.ScreenEntity}>
        <TouchableOpacity
          onPress={() => drawer.openDrawer()}
          style={styles.menuContainer}
          >
          <Icon as={Entypo} name="menu" size={8} color="#fff" />
        </TouchableOpacity>
      

        <View style={styles.containerTitle}>
          <Text style={styles.ScreenEntityTitle}>مواقع العائلات </Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
          
        </View>
      </View>
      <NavigateToFamily />
     
      <BottomBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#348578",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  containerTitle: {
    flexDirection: "row",
  },
  containerFilter: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  filterItem: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 5,
    minWidth: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 3,
  },
  filterText: {
    fontFamily: "Tajawal-Medium",
  },
  ScreenEntity: {
    flexDirection: "row",
    width: "100%",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  ScreenEntityTitle: {
    color: "#fff",
    fontSize: 25,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Section: {
    width: "100%",
    height: "90%",
    backgroundColor: "#f5f5f5",
   
    display: "flex",
    alignItems: "center",
  },
  Content: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#f5f5f5",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  menuContainer: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: "#348578",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  fab: {
    width: 50,
    height: 50,
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    elevation: 5,
    position: "absolute",
    bottom: 65,
    right: 10,
  },
});
