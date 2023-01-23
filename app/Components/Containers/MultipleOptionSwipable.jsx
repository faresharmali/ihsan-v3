import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { SwipeablePanel } from "rn-swipeable-panel";
import { Icon, Input } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function MultipleOptionSwipable({
  isPanelActive,
  setIsPanelActive,
  setshowButton,
  data,
  title,
  getSelectedData,
  type,
}) {
  const [Mydata, setData] = useState(
    data.map((d) => ({ ...d, selected: false }))
  );
  const [AllData, setAllData] = useState(
    data.map((d) => ({ ...d, selected: false }))
  );
  const [Allselected, setAllSelected] = useState({
    selected: false,
    title: "اختيار الكل",
  });
  const panelProps = {
    fullWidth: true,
    openLarge: false,
    closeOnTouchOutside: true,
    showCloseButton: true,

    onClose: () => {
      setIsPanelActive(false);
      setshowButton(true);
      getSelectedData(
        Mydata.filter((d) => d.selected),
        type
      );
      setData(AllData)
    },
    onPressCloseButton: () => {
      setIsPanelActive(false);
      setshowButton(true);
    },
  };
  const SelectData = (selected) => {
    let selectValue = selected.selected ? false : true;
    setData(
      Mydata.map((d) => ({
        ...d,
        selected: d.id == selected.id ? selectValue : d.selected,
      }))
    );
    setAllData(
      AllData.map((d) => ({
        ...d,
        selected: d.id == selected.id ? selectValue : d.selected,
      }))
    );
  };
  const selectAll = () => {
    let selectValue = Allselected.selected ? false : true;
    let title = Allselected.selected ? "اختيار الكل" : "حذف الكل";

    setData(
      Mydata.map((d) => ({
        ...d,
        selected: selectValue,
      }))
    );
    setAllSelected({ selected: selectValue, title: title });
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontSize: 15,
    marginBottom:5
  };

  const filterData=(e)=>{
    setData(AllData.filter((d)=>d.title.includes(e)))
  }
  return (
    <SwipeablePanel {...panelProps} isActive={isPanelActive}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
      <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="user" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          w={{
            base: "90%",
            md: "25%",
          }}
          h={50}
          textAlign="right"
          placeholder="البحث"
          {...styling}
          borderWidth={1}
          onChangeText={(text) => filterData(text)}
        />
        <TouchableOpacity
          onPress={() => selectAll()}
          style={{
            ...styles.ItemContainer,
            backgroundColor: Allselected.selected ? "#d93030" : "#348578",
            borderColor: Allselected.selected ? "#d93030" : "#348578",
          }}
        >
          <Text style={{ ...styles.Item, color: "#fff" }}>
            {Allselected.title}
          </Text>
        </TouchableOpacity>

        {Mydata.map((d,index) => (
          <TouchableOpacity
            key={index}
            onPress={() => SelectData(d)}
            style={{
              ...styles.ItemContainer,
              backgroundColor: d.selected ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{ ...styles.Item, color: d.selected ? "#fff" : "#000" }}
            >
              {d.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SwipeablePanel>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Tajawal-Medium",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    color: "#348578",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  ItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#348578",
    borderRadius: 10,
  },
  Item: {
    fontFamily: "Tajawal-Medium",
  },
});