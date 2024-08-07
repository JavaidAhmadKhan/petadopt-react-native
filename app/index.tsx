import React from 'react';
import { View, SafeAreaView, Image, StyleSheet, Text, Pressable } from 'react-native';

import Colors from '../constants/Colors';

export default function Index() {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <View>
        <Image
          style={styles.loginImg}
          source={require('../assets/images/login.png')}
        />
      </View>
      <View style={styles.textImgContainer}>
        <Text style={styles.textImg}>Ready to make a new friend?</Text>
        <Text style={styles.imgPara}>
          Let's adopt the pet which you like and make their life happy again
        </Text>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginImg: {
    width: '100%',
    height: 500,
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
