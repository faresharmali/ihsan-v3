import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import Family from "../../../assets/avatars/family.png";

import Kids from "../AdministrationSection/Famillies/Kids";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { DeleteReservation } from "../../api/user";
export default function Reservation({ route, navigation, updatePath }) {
  let Info = useSelector((state) =>  state.Meetings).filter(
    (i) => i.id == route.params.data.id    
  )[0];


  const deleteMeet = async (id) => {
    const res = await DeleteReservation({ id: id });
    if (res.ok) {
      navigation.goBack()
    } else {
      alert("حدثت مشكلة اثناء الحذف");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
          <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />
          
        </View>
        <Text style={styles.EntityTitle}>{Info?.description}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.Content}
      >
        <View style={styles.ActivityDetails}>
          <Text style={styles.Text}>
            <Text style={styles.textTitle}> سبب الحجز : </Text> {Info?.description}
          </Text>
          <Text style={styles.Text}>
            {" "}
            <Text style={styles.textTitle}> تاريخ الحجز :</Text> {Info?.DateString}
          </Text>

          <Text style={styles.Text}>
            {" "}
            <Text style={styles.textTitle}>من الساعة :</Text> {Info && (JSON.parse(Info?.time).start.hours +
              ":" +
              JSON.parse(Info?.time).start.minutes)}
          </Text>
          <Text style={styles.Text}>
            <Text style={styles.textTitle}> الى الساعة :</Text>{" "}
            {Info && ( JSON.parse(Info?.time).end.hours +
              ":" +
              JSON.parse(Info?.time).end.minutes)}
          </Text>
          <Text style={styles.Text}>
            {" "}
            <Text style={styles.textTitle}>حجز من قبل </Text> {Info?.user.name}
          
          </Text>
        </View>
        <Button onPress={()=>deleteMeet(Info?.id)} style={styles.btn} > <Text style={styles.btnText}>حذف الحجز</Text>  </Button>
       
      </ScrollView>

      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  infos: {
    marginRight: 5,
    width: "75%",
  },
  UserPersonal: {
    fontFamily: "Tajawal-Medium",
    fontSize: 15,
    color: "#000",
    marginBottom: 5,
  },
  DataContainer: {
    width: "100%",
    minHeight: 70,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: "#000",
    elevation: 1.5,
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: 10,
  },
  pageEntity: {
    width: "100%",
    maxHeight: "25%",
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 25,
  },

  EntityTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Tajawal-Medium",
  },
  IconsContainer: {
    top: 20,
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Content: {
    marginTop: 10,
    width: "100%",
    paddingTop: 10,
  },
  ActivityDetails: {
    width: "95%",
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  People: {
    width: "95%",
    borderRadius: 10,
    padding: 10,
  },
  Text: {
    fontSize: 17,
    fontFamily: "Tajawal-Medium",
  },
  title: {
    fontSize: 20,
    fontFamily: "Tajawal-Medium",
    margin: 15,
    width: "100%",
    textAlign: "center",
  },
  textTitle: {
    color: "#348578",
  },
  btn: {
    width: "50%",
    backgroundColor: "#b8180d",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff !important",
  },
  btnText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Tajawal-Medium",
  }
});
