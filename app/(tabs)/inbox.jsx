import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Colors from "@/constants/Colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "../../components/Inbox/UserItem";

export default function Indox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();
  }, [user]);

  // Get user list depends on current user email

  const GetUserList = async () => {
    setLoader(true);
    const q = query(
      collection(db, "Chat"),
      where(
        "userIds",
        "array-contains",
        user?.primaryEmailAddress?.emailAddress
      )
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setUserList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };
  // Filter the list of other user in one state

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (user) => user?.email != user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };

  return (
    <View style={styles.androidSafeArea}>
      <Text style={styles.header}>Indox</Text>
      <FlatList
        refreshing={loader}
        onRefresh={GetUserList}
        style={{ marginTop: 20 }}
        data={MapOtherUserList()}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
        )}
      />
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
  header: {
    fontFamily: "outfit-medium",
    fontSize: 30,
  },
});
