import { View, Pressable } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';

import Shared from '@/Shared/Shared';

export default function MarkFav({ pet, color = '#E8B20E' }: any) {
    const { user } = useUser();
    const [favList, setFavList] = useState([]);

    const getFav = useCallback(async () => {
        if (!user) return;
        try {
            const result = await Shared.GetFavList({ user });
            setFavList(result?.favorites || []);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    }, [user]);

    useEffect(() => {
        getFav();
    }, [getFav]);

    const addToFav = async () => {
        if (!user || !pet?.id) return;
        try {
            const updatedFavList = [...favList, pet.id];
            await Shared.UpdateFav(updatedFavList, user);
            setFavList(updatedFavList);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    const removeFromFav = async () => {
        if (!user || !pet?.id) return;
        try {
            const updatedFavList = favList.filter(id => id !== pet.id);
            await Shared.UpdateFav(updatedFavList, user);
            setFavList(updatedFavList);
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    const isFavorite = pet?.id && favList.includes(pet.id);

    return (
        <View>
            <Pressable onPress={isFavorite ? removeFromFav : addToFav}>
                <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={30}
                    color={isFavorite ? 'red' : color}
                />
            </Pressable>
        </View>
    )
}