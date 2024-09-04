import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import PetListItem from "./PetListItem";

export default function PetListCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList("Dogs");
  }, []);

  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);

    try {
      const q = query(
        collection(db, "Pets"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const pets = [];

      querySnapshot.forEach((doc) => {
        const petData = doc.data();
        pets.push(petData);
      });

      setPetList(pets);
    } catch (error) {
      console.error("Error fetching pet list:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={loader}
        onRefresh={() => GetPetList("Dogs")}
        data={petList}
        renderItem={({ item }) => <PetListItem pet={item} />}
        keyExtractor={(item, id) => id.toString()}
      />
    </View>
  );
}
