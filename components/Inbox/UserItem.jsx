import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";

export default function UserItem({ userInfo }) {
  return (
    <Link href={"/chat?id=" + userInfo.docId}>
      <View style={styles.mainContainer}>
        <Image source={{ uri: userInfo?.imageUrl }} style={styles.userImage} />
        <Text style={styles.userName}>{userInfo?.name}</Text>
      </View>
      <View style={styles.border} />
    </Link>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 7,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
  userName: {
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
  border: {
    borderWidth: 0.2,
    marginVertical: 7,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },
});
