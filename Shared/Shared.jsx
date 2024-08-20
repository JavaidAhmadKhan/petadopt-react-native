import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";

const GetFavList = async ({ user }) => {
  if (!user?.primaryEmailAddress?.emailAddress) {
    throw new Error("User email is not available");
  }

  const docRef = doc(db, "UserFavPet", user.primaryEmailAddress.emailAddress);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    const newData = {
      email: user.primaryEmailAddress.emailAddress,
      favorites: [],
    };
    await setDoc(docRef, newData);
    return newData;
  }
};

const UpdateFav = async (favorites, user) => {
  if (!user?.primaryEmailAddress?.emailAddress) {
    throw new Error("User email is not available");
  }

  const docRef = doc(db, "UserFavPet", user.primaryEmailAddress.emailAddress);
  try {
    await updateDoc(docRef, { favorites });
  } catch (err) {
    console.error("Error updating favorites:", err);
    throw err;
  }
};

export default { GetFavList, UpdateFav };
