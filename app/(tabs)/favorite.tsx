import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import Shared from '@/Shared/Shared';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';
import PetListItem from '@/components/Home/PetListItem';

export default function Favorite() {
    const user = useUser();
    const [favIds, setfavIds] = useState([]);
    const [favPetList, setFavPetList] = useState([]);
    const [loader, setLoadr] = useState(false)

    useEffect(() => {
        user && GetFavPetIds()
    }, [])

    //Fav Ids
    const GetFavPetIds = async () => {
        setLoadr(true)
        const result = await Shared.GetFavList(user);
        setfavIds(result?.favorites);
        setLoadr(false);
        GetFavPetList(result?.favorites);
    }

    // Fetch Related PetList 

    const GetFavPetList = async (favId_: any) => {
        setLoadr(true)
        setFavPetList([])
        const q = query(collection(db, 'Pets'), where('id', 'in', favId_));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setFavPetList(prev => [...prev, doc.data()]);
        })
        setLoadr(false)
    }

    return (
        <View style={{ padding: 20, marginTop: 20, }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 30, }}>Favorites</Text>
            <FlatList
                data={favPetList}
                numColumns={2}
                onRefresh={GetFavPetIds}
                refreshing={loader}
                renderItem={({ item, index }) => (
                    <View>
                        <PetListItem pet={item} />
                    </View>
                )} />
        </View>
    )
}