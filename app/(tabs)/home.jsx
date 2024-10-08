import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import PetListByCategory from "@/components/Home/PetListByCategory";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.androidSafeArea}>
      <ScrollView>
        <Header />
        <Slider />
        <PetListByCategory />
        <View style={{ height: 120 }}></View>
      </ScrollView>
      <TouchableOpacity style={styles.postContainer}>
        <Link href={"/add-new-pet"}>
          <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
          <Text style={styles.postText}>Add New Pet</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  androidSafeArea: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: Colors.GRAY,
    paddingTop: Platform.OS === "android" ? 50 : 50,
  },
  postContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    borderStyle: "dashed",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    zIndex: 99,
  },
  postText: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: Colors.PRIMARY,
  },
});
