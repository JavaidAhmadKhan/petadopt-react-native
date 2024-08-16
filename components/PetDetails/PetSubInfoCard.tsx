import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

interface PetSubInfoCard {
    icon: any,
    title: string,
    value: string,
}

export default function PetSubInfoCard({ icon, title, value }: PetSubInfoCard) {
    return (
        <View style={styles.mainImgContainer}>
            <Image source={icon} style={{ width: 40, height: 40, }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>{title}</Text>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>{value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainImgContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        padding: 10,
        margin: 10,
        borderRadius: 8,
        gap: 10,
        flex: 1,
    }
})