import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

export default function Indox() {
  return (
    <View style={styles.androidSafeArea}>
      <Text>Indox</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  androidSafeArea: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: Colors.GRAY,
    paddingTop: Platform.OS === "android" ? 50 : 50,
  },
});
