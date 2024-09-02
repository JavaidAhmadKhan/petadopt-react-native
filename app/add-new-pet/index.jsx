import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import Colors from "@/constants/Colors";
import { storage } from "../../config/firebaseconfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    category: "Dogs",
    sex: "Male",
  });
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectCategory, setSelectedCatgory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]); // Clear the list before fetching new data
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const imagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    // console.log(fieldName, fieldValue);
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onSubmit = () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Enter all details", ToastAndroid.SHORT);
      return;
    }

    UploadImage();
  };
  // used to upload pet image to firebase storage server
  const UploadImage = async () => {
    setLoader(true);
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, "/PetAdopt/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blobImage)
      .then((snapshot) => {
        console.log("File Upload");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          SaveFormData(downloadUrl);
        });
      });
  };

  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.headerTitle}>Add new pet for adoption</Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={styles.buttonImage}
          />
        ) : (
          <Image source={{ uri: image }} style={styles.buttonImage} />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("name", value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCatgory(itemValue);
            handleInputChange("category", itemValue);
          }}
          style={styles.input}
        >
          {categoryList.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("breed", value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("age", value)}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
          style={styles.input}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("weight", value)}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          onChangeText={(value) => handleInputChange("address", value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        disabled={loader}
        onPress={onSubmit}
      >
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text style={styles.submitButton}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  headerTitle: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    marginVertical: 5,
  },
  buttonImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: "outfit",
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginBottom: 60,
    marginTop: 15,
  },
  submitButton: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.WHITE,
  },
});
