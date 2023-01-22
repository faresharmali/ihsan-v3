import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "native-base";
import { Ionicons, FontAwesome, MaterialCommunityIcons ,AntDesign} from "@expo/vector-icons";

import man from "../../../assets/avatars/man.png";
import info from "../../../assets/icons/information.png";
import DataContainer from "../../Components/DataContainer";
import { useSelector } from "react-redux";
import Family from "../../../assets/avatars/family.png";

import FamilyInfosContainer from "../../Components/Containers/FamilyInfosContainer";
export default function UserProfile({ route, navigation }) {
  const [section, setSection] = useState("infos");

  let LoggedUser = useSelector((state) => state.Auth);
  let User = useSelector((state) => state.users).filter((user)=>user.id==LoggedUser.id)[0];

  let Informations = useSelector((state) => state.Informations).filter((info)=>info.author==LoggedUser?.name);
  const openModal = (data) => {
    navigation.navigate("InformationAdmin", {data});
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile",{Infos:{...LoggedUser}})}>
          <Icon
            as={MaterialCommunityIcons}
            size={8}
            color="#fff"
            name="square-edit-outline"
          />
          </TouchableOpacity>
          
       
        </View>
        <Image style={styles.EntityImage} source={man} />
        <Text style={styles.EntityTitle}>{LoggedUser.name}</Text>
        <View style={styles.Navigation}>
          <TouchableOpacity onPress={() => setSection("infos")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>معلومات</Text>
            </View>
          </TouchableOpacity>
          {(LoggedUser.job=="وسيط اجتماعي" || LoggedUser.job=="موزع القفة") && (
            <TouchableOpacity onPress={() => setSection("famillies")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>العائلات</Text>
            </View>
          </TouchableOpacity>
            )}
         
          <TouchableOpacity onPress={() => setSection("posts")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>المنشورات</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {section == "infos" && (
        <UserInfos title="معلومات العضو" data={LoggedUser} />
      )}
           {section == "famillies" && (
        <>
          <ScrollView style={styles.Content}>
            {User.followers?.map((f) => (
                <FamilyInfosContainer
                  key={f._id}
                  AvatarSize={40}
                  data={f}
                  pic={Family}
                  selectFamily={()=>{}}
                />
              ))}
            {User.deliveries?.map((f) => (
                <FamilyInfosContainer
                  key={f._id}
                  AvatarSize={40}
                  data={f}
                  pic={Family}
                  selectFamily={()=>{}}
                />
              ))}
          </ScrollView>
         
        </>
      )}
  
      {section == "posts" && (
        <ScrollView style={styles.Content}>
         {Informations.map((f) => (
            <DataContainer
              key={f.id}
              AvatarSize={22}
              data={f}
              pic={info}
              openFamily={() => openModal(f)}
            />
          ))}
        </ScrollView>
      )}
     
    </View>
  );
}

const UserInfos = ({ title, data }) => {

    return (
        <View style={detailsStyles.InfosContainer}>
      <View style={detailsStyles.titleContainer}></View>
      <View style={detailsStyles.Info}>
        <Text style={detailsStyles.InfoText}>الاسم و اللقب: {data.name} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="user" />
      </View>
      <View style={detailsStyles.Info}>
        <Text style={detailsStyles.InfoText}> اسم المستخدم : {data.username} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="id-badge" />
      </View>
      <View style={detailsStyles.Info}>
        <Text style={detailsStyles.InfoText}>المسؤولية : {data.job} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="building" />
      </View>
      <View style={detailsStyles.Info}>
        <Text style={detailsStyles.InfoText}>رقم الهاتف : {data.phone}</Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="phone" />
      </View>

      <View style={detailsStyles.Info}>
        <Text style={detailsStyles.InfoText}>
          تاريخ التسجيل :{" "}
          {new Date(data.joined).getFullYear() +
            "/" +
            (new Date(data.joined).getMonth() + 1) +
            "/" +
            new Date(data.joined).getDate()}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="calendar" />
      </View>
    </View>
    )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  pageEntity: {
    width: "100%",
    maxHeight: "25%",
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  EntityImage: {
    width: 70,
    height: 70,
    marginBottom: 5,
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
  Navigation: {
    width: "90%",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 3,
    height: 50,
    bottom: -25,
  },
  NavigationItemText: {
    fontFamily: "Tajawal-Medium",
  },
  NavigationItem: {
    height: "100%",
    justifyContent: "center",
    width: 100,
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    alignItems: "center",
  },

  Content: {
    marginTop: 30,
    width: "100%",
    maxHeight: "71.5%",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
});

const detailsStyles = StyleSheet.create({
    InfosContainer: {
      width: "90%",
      backgroundColor: "#fff",
      marginTop: 60,
      borderRadius: 15,
      padding: 10,
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
  });
  