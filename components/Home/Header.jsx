import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.userText}> {user?.fullName}</Text>
      </View>
      <Image source={{ uri: user?.imageUrl }} style={styles.userImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontFamily: "outfit",
    fontSize: 18,
  },
  userText: {
    fontFamily: "outfit-medium",
    fontSize: 25,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
});
