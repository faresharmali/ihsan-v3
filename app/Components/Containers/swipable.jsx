import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { SwipeablePanel } from "rn-swipeable-panel";
import { Icon, Input } from "native-base";

export default function Swipable({
  isPanelActive,
  setIsPanelActive,
  setshowButton,
  data,
  ChooseJob,title,
  search
}) {

  const [Mydata, setData] = useState(
    data.map((d) => ({ ...d, selected: false }))
  );
  const panelProps = {
    fullWidth: true,
    openLarge: false,
    closeOnTouchOutside: true,
    showCloseButton: true,

    onClose: () => {
      setIsPanelActive(false);
      setshowButton(true);
      setData( data.map((d) => ({ ...d, selected: false })))
    },
    onPressCloseButton: () => {
      setIsPanelActive(false);
      setshowButton(true);
    },
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontSize: 15,
    marginBottom:5
  };
  const filterData=(e)=>{
    setData(data.filter((d)=>d.title.includes(e)))
  }
  return (
    <SwipeablePanel {...panelProps} isActive={isPanelActive}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {search && (

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
          )}
        {Mydata.map((d,index) => (
          <TouchableOpacity  key={d.index} onPress={()=>ChooseJob(d.title,d.value)} style={styles.ItemContainer}>
            <Text style={styles.Item}>{d.title}</Text>
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
    marginTop:20
  },
  ItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 50,
    marginBottom:10,
    borderWidth:1,
    borderColor:"#348578",
    borderRadius:10
  },
  Item:{
    fontFamily: "Tajawal-Medium",

  }
});
