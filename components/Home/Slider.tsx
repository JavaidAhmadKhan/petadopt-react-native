import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

interface SliderItem {
    imageUrl: string;
    // Add other properties if needed
}

export default function Slider() {
    const [sliderList, setSliderList] = useState<SliderItem[]>([])

    useEffect(() => {
        GetSliders();
    }, []);

    const GetSliders = async () => {
        setSliderList([]);  // Clear the list before fetching new data
        const snapshot = await getDocs(collection(db, "Slider"));
        snapshot.forEach((doc) => {
            // console.log(doc.data());
            setSliderList(sliderList => [...sliderList, doc.data() as SliderItem])
        });
    }

    return (
        <View style={{ marginTop: 15}}>
            <FlatList
                data={sliderList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    sliderImage: {
        width: Dimensions.get('screen').width * 0.9,
        height: 180,
        borderRadius: 15,
        marginRight: 15,
        objectFit: 'cover'
    }
})