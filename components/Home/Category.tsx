import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';
import Colors from '@/constants/Colors';

interface CategoryItem {
    imageUrl: string;
    name: string;
    // Add other properties if needed
}

export default function Category() {
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
    const [selectCategory, setSelectedCatgory] = useState('Cats');

    useEffect(() => {
        GetCategories();
    }, []);

    const GetCategories = async () => {
        setCategoryList([]);  // Clear the list before fetching new data
        const snapshot = await getDocs(collection(db, "Category"));
        snapshot.forEach((doc) => {
            // console.log(doc.data());
            setCategoryList(categoryList => [...categoryList, doc.data() as CategoryItem])
        });
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.categoryText}>Category</Text>
            <FlatList
                data={categoryList}
                numColumns={4}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => setSelectedCatgory(item.name)} style={{ flex: 1 }}>
                        <View style={[styles.imgViewContainer, selectCategory == item.name && styles.selectedCategoryContainer]}>
                            <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
                        </View>
                        <Text style={{ textAlign: 'center', fontFamily: 'outfit' }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20
    },
    categoryText: {
        fontFamily: 'outfit-medium',
        fontSize: 20,
    },
    imgViewContainer: {
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding: 15,
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.PRIMARY,
        margin: 5,

    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    selectedCategoryContainer: {
        backgroundColor: Colors.SECONDARY,
        borderColor: Colors.SECONDARY,
    }
})