import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { UpdateProfileInfo } from "../api/user";
import { useDispatch } from "react-redux";
export default function UpdateProfile({ route, navigation }) {

  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const setLoggedUser = (data) => {
    return {
      type: "setLoggedUser",
      data: data,
    };
  };

  const [errors, SetErrors] = useState({
    username: false,
    password: false,
    phone: false,
    confirmepassword: false,
    name: false,
    job: false,
    famillies: false,
  });

  const [userInfos, setuserInfos] = useState({
    ...route.params.Infos,
    password: "",
  });

  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setuserInfos({ ...userInfos, [name]: text });
  };


  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };
 

  const UpdateUserInfos = async () => {
    Keyboard.dismiss();
    if (validate()) {
      if (userInfos.password.trim()!="" ) {
        if(userInfos.password.trim().length < 8){
          setErrorMessage("كلمة المرور يجب ان تكون اكثر من 8 احرف");
          setErrorMessageVisible(true);
          error=true
        }else{
          const user = { ...userInfos };
          const res = await UpdateProfileInfo({ ...user });

          if (res.ok) {
            dispatch(setLoggedUser(res.data));
            navigation.navigate("UserProfile");
          } else {
          }
        }
      } 
     else {
     const user = { ...userInfos };
     delete user.password
     const res = await UpdateProfileInfo({ ...user });
     if (res.ok) {
      dispatch(setLoggedUser(res.data));
       navigation.navigate("UserProfile");
     } else {
     }
    }
    }
  };

  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (userInfos.name.trim() == "") {
      (FieldErrors.name = true), (valid = false);
    }
    if (userInfos.username.trim() == "") {
      (FieldErrors.username = true), (valid = false);
    }
    if (userInfos.phone.trim() == "") {
      (FieldErrors.phone = true), (valid = false);
    }

    SetErrors(FieldErrors);
    return valid;
  };


  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}> تعديل المعلومات</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon
            style={styles.back}
            as={FontAwesome}
            name="close"
            size={7}
            color="#348578"
          />
        </TouchableWithoutFeedback>
      </View>

      <Stack space={4} w="100%" alignItems="center">
        <View style={styles.InputsContainer}>
          <Text style={styles.label}> الاسم و القب</Text>
          <Input
            InputRightElement={
              <Icon
                style={{ marginRight: 10 }}
                as={<MaterialIcons name="account-circle" />}
                size={5}
                ml="2"
                color="#348578"
              />
            }
            style={styles.input}
            w={{
              base: "100%",
              md: "95%",
            }}
            h={50}
            textAlign="right"
            placeholder="اسم المستخدم"
            onChangeText={(text) => handleUserInput(text, "name")}
            {...styling}
            borderWidth={1}
            value={userInfos.name}
            borderColor={errors.username ? "#c21a0e" : "grey"}
          />
        </View>
        <View style={styles.InputsContainer}>
          <Text style={styles.label}>اسم المستخدم</Text>
          <Input
            InputRightElement={
              <Icon
                style={{ marginRight: 10 }}
                as={<MaterialIcons name="account-circle" />}
                size={5}
                ml="2"
                color="#348578"
              />
            }
            style={styles.input}
            w={{
              base: "100%",
              md: "95%",
            }}
            h={50}
            textAlign="right"
            placeholder="اسم المستخدم"
            onChangeText={(text) => handleUserInput(text, "username")}
            {...styling}
            borderWidth={1}
            value={userInfos.username}
            borderColor={errors.username ? "#c21a0e" : "grey"}
          />
        </View>

        <View style={styles.InputsContainer}>
          <Text style={styles.label}>رقم الهاتف</Text>
          <Input
            InputRightElement={
              <Icon
                style={{ marginRight: 10 }}
                as={<MaterialIcons name="phone" />}
                size={5}
                ml="2"
                color="#348578"
              />
            }
            w={{
              base: "100%",
              md: "25%",
            }}
            h={50}
            textAlign="right"
            placeholder="رقم الهاتف"
            value={userInfos.phone}
            onChangeText={(text) => handleUserInput(text, "phone")}
            {...styling}
            borderWidth={1}
            borderColor={errors.phone ? "#c21a0e" : "grey"}
          />
        </View>
        <View style={styles.InputsContainer}>
          <Text style={styles.label}>كلمة المرور</Text>
          <Input
            InputRightElement={
              <Icon
                style={{ marginRight: 10 }}
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="#348578"
              />
            }
            w={{
              base: "100%",
              md: "25%",
            }}
            h={50}
            textAlign="right"
            placeholder="كلة المرور"
            type={"password"}
            onChangeText={(text) => handleUserInput(text, "password")}
            {...styling}
            borderWidth={1}
            borderColor={errors.password ? "#c21a0e" : "grey"}
          />
        </View>
      </Stack>
      {ErrorMessageVisible && (
        <View style={styles.ErrorMessage}>
          <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
          <Text style={styles.errorText}>{ErrorMessage}</Text>
        </View>
      )}

     
        <Button style={styles.Button} mode="contained" onPress={UpdateUserInfos}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>تعديل</Text>
        </Button>
    
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    width: "95%",
    height: 50,
    borderColor: "#000",
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    borderWidth: 1,
  },
  InputText: {
    fontFamily: "Tajawal-Medium",
  },
  Container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "10%",
  },
  PageTitile: {
    fontSize: 25,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },
  TitleContainer: {
    width: "100%",
    flexDirection: "row-reverse",
    alignContent: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 0,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontFamily: "Tajawal-Medium",
    color: "#348578",
    marginBottom: 10,
  },

  Button: {
    flexDirection: "row-reverse",
    height: 50,
    width: 230,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#348578",
    marginTop: 25,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 6,
  },
  back: {
    left: 0,
  },
  Modal: {
    width: "100%",
  },
  ErrorMessage: {
    width: "80%",
    height: 40,
    backgroundColor: "#FECDD3",
    marginTop: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 10,
  },
  errorText: {
    fontFamily: "Tajawal-Medium",
    marginRight: 10,
    fontSize: 13,
  },
  InputsContainer: {
    width: "95%",
    flexDirection: "column",
  },
});
