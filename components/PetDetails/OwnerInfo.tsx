import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Colors from '@/constants/Colors'

export default function OwnerInfo({ pet }: any) {
    return (
        <View style={styles.mainContainer}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 20, }}>
                <Image source={{ uri: pet?.userImage }} style={{ width: 50, height: 50, borderRadius: 99, objectFit: 'cover' }} />
                <View>
                    <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>{pet?.username}</Text>
                    <Text style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}> Pet Owner</Text>
                </View>
            </View>
            <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: 40,
        marginHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.PRIMARY,
        justifyContent: "space-between",

    }
})