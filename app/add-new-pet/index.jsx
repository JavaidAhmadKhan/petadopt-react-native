import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";

export default function AddNewPet() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add new pet for adoption
      </Text>
      <Image
        source={require("../../assets/images/placeholder.png")}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: Colors.GRAY,
        }}
      />
      {/* <View>
                <Text>Pet Name *</Text>
                <TextInput placeholder='Pet Name' />
            </View> */}
    </View>
  );
}
