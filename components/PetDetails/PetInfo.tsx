import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native';

import Colors from '@/constants/Colors';
import MarkFav from '../MarkFav';


export default function PetInfo({ pet }: any) {
    return (
        <View>
            <Image source={{ uri: pet?.imageUrl }} style={styles.petImg} />
            <View style={styles.contentHoldingContainer}>
                <View>
                    <Text style={styles.petName}>{pet?.name}</Text>
                    <Text style={styles.petAddress}>{pet?.address}</Text>
                </View>
                <MarkFav pet={pet} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    contentHoldingContainer: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    petImg: {
        width: '100%',
        height: 400,
        objectFit: 'cover',
    },
    petName: {
        fontFamily: 'outfit-bold',
        fontSize: 27,
    },
    petAddress: {
        fontFamily: 'outfit',
        fontSize: 16,
        color: Colors.GRAY
    }
});