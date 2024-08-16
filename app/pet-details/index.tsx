import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';
import Colors from '@/constants/Colors';
import AboutPet from '@/components/PetDetails/AboutPet';
import OwnerInfo from '@/components/PetDetails/OwnerInfo';

export default function PetDetails() {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.PRIMARY
        })
    }, [])

    return (
        <View>
            <ScrollView>
                <PetInfo pet={pet} />
                <PetSubInfo pet={pet} />
                <AboutPet pet={pet} />
                <OwnerInfo pet={pet} />
                <View style={{ height: 70, }}></View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.adoptButton}>
                    <Text style={{ textAlign: 'center', fontFamily: 'outfit-medium', fontSize: 20, color: Colors.WHITE }}>Adopt Me</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    adoptButton: {
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        alignItems: 'center',

    },
    bottomContainer: {
        position: 'absolute',
        width: "100%",
        bottom: 0,

    }
})