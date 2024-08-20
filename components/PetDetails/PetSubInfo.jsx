import { View, StyleSheet, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard
          icon={require("../../assets/images/calendar.png")}
          title={"Age"}
          value={pet?.age + " Years"}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/bone.png")}
          title={"Breed"}
          value={pet?.breed}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PetSubInfoCard
          icon={require("../../assets/images/sex.png")}
          title={"Sex"}
          value={pet?.sex}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/weight.png")}
          title={"Weight"}
          value={pet?.weight + " Kg"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainImgContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    gap: 10,
    flex: 1,
  },
});
