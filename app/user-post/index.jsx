import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import PetListItem from "../../components/Home/PetListItem";
import Colors from "../../constants/Colors";

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();

  const [userPostList, setUserPostList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Post",
    });
    user && GetUserPost();
  }, [user]);

  const GetUserPost = async () => {
    setLoader(true);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      setUserPostList((prev) => [...prev, doc.data()]);
      setLoader(false);
    });
  };

  const OnDeletePost = (docId) => {
    Alert.alert(
      "Do You want to  delete?",
      "Do you really want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel click"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(docId),
        },
      ]
    );
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.userPost}>User Post</Text>
      <FlatList
        numColumns={2}
        refreshing={loader}
        onRefresh={GetUserPost}
        data={userPostList}
        renderItem={({ item, id }) => (
          <View>
            <PetListItem pet={item} key={id} />
            <Pressable
              onPress={() => OnDeletePost(item?.id)}
              style={styles.deleteButton}
            >
              <Text
                style={{ fontFamily: "outfit-medium", textAlign: "center" }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
      {userPostList?.length == 0 && <Text>No Post Found</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  userPost: {
    fontFamily: "outfit-medium",
    fontSize: 26,
  },
  deleteButton: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
});
