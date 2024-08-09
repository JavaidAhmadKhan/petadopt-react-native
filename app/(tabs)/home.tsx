import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Header from '@/components/Home/Header';
import Slider from '@/components/Home/Slider';
import PetListCategory from '@/components/Home/PetListCategory';
import Colors from '@/constants/Colors';

export default function Home() {
    const { user } = useUser()
    return (
        <View style={styles.androidSafeArea}>
            <Header />
            <Slider />
            <PetListCategory />
            <TouchableOpacity style={styles.postContainer}>
                <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
                <Text style={styles.postText}>Add New Pet
                </Text>
            </TouchableOpacity>
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
    postContainer:
    {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
        padding: 20,
        backgroundColor: Colors.LIGHT_PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 15,
        borderStyle: 'dashed',
        justifyContent: 'center'
    },
    postText: {
        fontFamily: 'outfit-medium',
        fontSize: 18,
        color: Colors.PRIMARY
    }
});