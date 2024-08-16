import { View, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';
import PetListItem from './PetListItem';

interface Pet {
    imageUrl: string;
    name: string;
    category: string;
    // Add other properties if needed
}

export default function PetListCategory() {
    const [petList, setPetList] = useState<Pet[]>([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        GetPetList('Cats');
    }, []);

    const GetPetList = async (category: string) => {
        setLoader(true);
        setPetList([]);

        try {
            const q = query(collection(db, 'Pets'), where('category', '==', category));
            const querySnapshot = await getDocs(q);
            const pets: Pet[] = [];

            querySnapshot.forEach((doc) => {
                const petData = doc.data() as Pet;
                pets.push(petData);
            });

            setPetList(pets);
        } catch (error) {
            console.error('Error fetching pet list:', error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <View>
            <Category category={(value: string) => GetPetList(value)} />
            <FlatList
               horizontal
                showsHorizontalScrollIndicator={false}
                refreshing={loader}
                onRefresh={() => GetPetList('Cats')}
                data={petList}
                renderItem={({ item }) => (
                    <PetListItem pet={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
