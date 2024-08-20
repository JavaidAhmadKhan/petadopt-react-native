import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "../MarkFav";

export default function PetListItem({ pet }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
    >
      <View style={{ position: "absolute", zIndex: 10, right: 10, top: 10 }}>
        <MarkFav pet={pet} color={Colors.PRIMARY} />
      </View>
      <View style={styles.mainContainer}>
        <Image source={{ uri: pet?.imageUrl }} style={styles.img} />
        <Text style={styles.petText}>{pet?.name}</Text>
        <Text style={styles.petBreed}>{pet?.breed}</Text>
        <Text style={styles.petAge}>{pet?.age} Years</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginTop: 10,
  },
  petText: {
    fontFamily: "outfit-medium",
    fontSize: 22,
    marginTop: 10,
  },
  petBreed: {
    color: Colors.GRAY,
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
  petAge: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
    borderRadius: 10,
    fontSize: 16,
  },
  img: {
    width: 150,
    height: 100,
    objectFit: "cover",
    borderRadius: 15,
  },
});
