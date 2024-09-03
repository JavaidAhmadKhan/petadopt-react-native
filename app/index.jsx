import React, { useEffect } from "react";
import { View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
export default function Index() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoaded();
  }, [rootNavigationState]);

  const CheckNavLoaded = () => {
    if (!rootNavigationState || !rootNavigationState.key) return null;
  };

  return (
    user && (
      <View style={{ flex: 1 }}>
        {user ? (
          <Redirect href={"/(tabs)/home"} />
        ) : (
          <Redirect href={"/login"} />
        )}
      </View>
    )
  );
}

// import React, { useEffect } from "react";
// import { View } from "react-native";
// import { useUser } from "@clerk/clerk-expo";
// import { Redirect, useRootNavigationState } from "expo-router";

// export default function Index() {
//   const { user } = useUser();
//   const rootNavigationState = useRootNavigationState();

//   useEffect(() => {
//     if (rootNavigationState.key) {
//       // Only check navigation state if it's loaded
//       CheckNavLoaded();
//     }
//   }, [rootNavigationState.key]);

//   const CheckNavLoaded = () => {
//     // If navigation is loaded and user exists, redirect to the home screen
//     if (user) {
//       return <Redirect href={"/(tabs)/home"} />;
//     } else {
//       return <Redirect href={"/login"} />;
//     }
//   };

//   return <View style={{ flex: 1 }}>{CheckNavLoaded()}</View>;
// }
