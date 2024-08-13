import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'

export default function AboutPet({ pet }: any) {
    const [readMore, setReadMore] = useState(true)
    return (
        <View style={{ paddingHorizontal: 20, }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, marginVertical: 10 }}>About: {pet?.name}</Text>
            <ScrollView>
                <Text numberOfLines={readMore ? 3 : 20} style={{ fontFamily: 'outfit', fontSize: 16, }}>About: {pet?.about} </Text>
            </ScrollView>
            {readMore &&
                <Pressable onPress={() => setReadMore(false)}>
                    <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-medium', fontSize: 16, }}>Read More
                    </Text>
                </Pressable>}
        </View>
    )
}


