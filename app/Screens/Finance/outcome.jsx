import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import { getTransactions } from "../../api/Finance";
import FinanceSectionBottomBar from "../../Navigation/FinanceSectionBottomBar";
import styles from "./styles";
import TransactionContainer from "../../Components/TransactionContainer";
export default function Outcome({ navigation, drawer }) {
  const [active, setActive] = useState(6);
  const [filterBy, setfilterBy] = useState("all");
  const dispatch = useDispatch();
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة الكفالة بنجاح  👋",
    });
  };
  const updateState = (data) => {
    return {
      type: "UpdateTransactions",
      data: data,
    };
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refresh()
    });

    return unsubscribe;
  }, [navigation]);

  let Transactions = useSelector((state) => state.Finance).transactions.filter(
    (t) => !t.income
  );

  const openTransaction = (id) => {
    navigation.navigate("Transaction", { id, type: "مصروف" ,refresh});
  };
  const filterData = (type) => {
    setfilterBy(type);
  

  };
  const refresh = async () => {
    try {
      const res = await getTransactions();
      dispatch(updateState(res.data.result));

    } catch (e) {
      console.log(e);
    }
  };
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
          <Text style={styles.ScreenEntityTitle}>المصاريف : قسم المالية </Text>
          <FontAwesome5 name="hand-holding-heart" size={25} color="#fff" />
        </View>
      </View>
      <View style={styles.containerFilter}>
        <TouchableWithoutFeedback
          onPress={() => {
            filterData("تبرع");
            setActive(1);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 1 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 1 ? "#fff" : "#000",
              }}
            >
              تبرع
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterData("زكاة");
            setActive(2);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 2 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 2 ? "#fff" : "#000",
              }}
            >
              زكاة{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterData("تحويل");
            setActive(3);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 3 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 3 ? "#fff" : "#000",
              }}
            >
              تحويل{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterData("كفالة");
            setActive(4);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 4 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 4 ? "#fff" : "#000",
              }}
            >
              كفالة
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterData("حصالة");
            setActive(5);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 5 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 5 ? "#fff" : "#000",
              }}
            >
              حصالة
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterData("all");
            setActive(6);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 6 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 6 ? "#fff" : "#000",
              }}
            >
              الكل
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.Section}>
        <ScrollView style={styles.Content}>
        {filterBy == "all"
            ? Transactions.map((transaction) => (
                <TransactionContainer
                  key={transaction.identifier}
                  open={openTransaction}
                  data={transaction}
                />
              ))
            : Transactions.filter((t) => t.type == filterBy).map(
                (transaction) => (
                  <TransactionContainer
                    key={transaction.identifier}
                    open={openTransaction}
                    data={transaction}
                  />
                )
              )}
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddOutcome", { showToast })}
        style={styles.fab}
      >
        <Icon as={Entypo} name="plus" size={8} color="#fff" />
      </TouchableOpacity>
      <FinanceSectionBottomBar navigation={navigation} />
    </View>
  );
}
