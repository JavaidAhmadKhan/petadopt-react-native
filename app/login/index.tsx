import React from "react";
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useOAuth } from '@clerk/clerk-expo';

import Colors from "@/constants/Colors";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <View>
        <Image
          style={styles.loginImg}
          source={require('../../assets/images/login.png')}
        />
      </View>
      <View style={styles.textImgContainer}>
        <Text style={styles.textImg}>Ready to make a new friend?</Text>
        <Text style={styles.imgPara}>
          Let's adopt the pet which you like and make their life happy again
        </Text>
        <Pressable onPress={onPress} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginImg: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  textImgContainer: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  imgPara: {
    fontFamily: 'outfit',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.GRAY,
  },
  textImg: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    textAlign: 'center',
  },
  loginButton: {
    padding: 14,
    marginTop: 100,
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    borderRadius: 14
  },
  loginButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }
});
