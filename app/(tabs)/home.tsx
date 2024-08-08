import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import Header from '@/components/Home/Header';

export default function Home() {
    const { user } = useUser()
    return (
        <View style={styles.androidSafeArea}>
            <Header />
            {/* Slider */}
            {/* Category */}
            {/* List of Pets */}
            {/* Add new pet option */}
        </View>
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,

        padding: 20,
        backgroundColor: 'gray',
        paddingTop: Platform.OS === 'android' ? 50 : 0
    },
});