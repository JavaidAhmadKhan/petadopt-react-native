import { View, SafeAreaView, Image, StyleSheet, Text } from "react-native";

import Colors from "../constants/Colors";

export default function Index() {
  return (
    <SafeAreaView>
      <View>
        <Image
          style={styles.loginImg}
          source={require("../assets/images/login.png")}
        />
      </View>
      <View style={styles.textImgContainer}>
        <Text style={styles.textImg}>Ready to make a new friend?</Text>
        <Text style={styles.imgPara}>
          Let's adopt the pet which you like and make there life happy again
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginImg: {
    width: "100",
    height: 500,
  },
  textImgContainer: {
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  imgPara: {
    fontFamily: "outfit",
    fontSize: 18,
    textAlign: "center",
    color: Colors.GRAY,
  },
  textImg: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    textAlign: "center",
  },
});
