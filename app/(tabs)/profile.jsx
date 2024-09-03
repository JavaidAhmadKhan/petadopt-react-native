import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function profile() {
  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const onPressMenu = (menu) => {
    if (menu == "logout") {
      signOut();
      return;
    }
    router.push(menu.path);
  };
  return (
    <View style={styles.androidSafeArea}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
        <Text style={styles.userName}>{user?.fullName}</Text>
        <Text style={styles.emailAddress}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            key={index}
            style={styles.iconsContainer}
          >
            <Ionicons
              name={item?.icon}
              size={30}
              color={Colors.PRIMARY}
              style={styles.icons}
            />
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
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
  imageContainer: {
    display: "flex",
    alignItems: "center",
    marginVertical: 25,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 99,
  },
  userName: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginTop: 7,
  },
  emailAddress: {
    fontFamily: "outfit",
    fontSize: 16,
    marginTop: 5,
    color: Colors.LIGHT_PRIMARY,
  },
  iconsContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 10,
  },
  icons: {
    padding: 10,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 10,
  },
  itemName: {
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
});
