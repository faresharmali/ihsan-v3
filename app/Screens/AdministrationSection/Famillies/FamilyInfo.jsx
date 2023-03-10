import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { Icon } from "native-base";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { DeleteFamily } from "../../../api/family";
import { Button } from "react-native-paper";

export default function FamilyInfo({ navigation, title, data }) {
  let date = new Date(data?.signupDate);

  const deleteFamilly = async (id) => {
    const res = await DeleteFamily(data);
    if (res.ok) {
      navigation.goBack();
    } else {
      alert("erreur");
    }
  };

  return (
    <>
      <View style={styles.InfosContainer}>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>
            اسم و لقب الأم : {data?.motherFullName}{" "}
          </Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="user" />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>
            اسم و لقب الأب : {data?.fatherFirstName} {data?.fatherLastName}{" "}
          </Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="user" />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>العنوان : {data?.adresse}</Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="map-marker" />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>
            رقم الهاتف :
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${data?.phone}`)}
            >
              <Text style={{ color: "blue" }}> {data?.phone}</Text>
            </TouchableOpacity>
          </Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="phone" />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}> المدخول : {data?.salary} </Text>
          <Icon as={FontAwesome5} size={6} color="#348578" name="wallet" />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}> مبلغ الكفالة : {data?.donation} </Text>
          <Icon as={FontAwesome5} size={6} color="#348578" name="wallet" />
        </View>

        <View style={styles.Info}>
          <Text style={styles.InfoText}>
            الوسيط الاجتماعي : {data?.wasseet[0]?.name}{" "}
          </Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="users" />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>
            موزع القفة : {data?.delivery[0]?.name}{" "}
          </Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="users" />
        </View>

        <View style={styles.Info}>
          <Text style={styles.InfoText}>
            تاريخ التسجيل :{" "}
            {date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate()}
          </Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="calendar" />
        </View>
      </View>
      <Button onPress={() => deleteFamilly(data?._id)} style={styles.btn}>
        {" "}
        <Text style={{ color: "#fff", fontSize: 17 }}>حذف</Text>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  InfosContainer: {
    width: "90%",
    height: 450,
    backgroundColor: "#fff",
    marginTop: 60,
    elevation: 1,
    borderRadius: 15,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Info: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontFamily: "Tajawal-Medium",
  },
  InfoText: {
    margin: 10,
    fontSize: 16,
    fontFamily: "Tajawal-Medium",
  },
  btn: {
    backgroundColor: "#b8180d",
    marginTop: 20,
    width: "40%",
  },
});
