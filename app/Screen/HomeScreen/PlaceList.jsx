import React, { forwardRef, useImperativeHandle } from "react";
import { View, FlatList, Dimensions, StyleSheet,Text } from "react-native";
import PlaceItem from "./PlaceItem";

const PlaceList = forwardRef(({ placeList, onNavigate }, ref) => {
    const flatListRef = React.useRef(null);

    useImperativeHandle(ref, () => ({
        scrollToIndex: (index) => {
            flatListRef.current?.scrollToIndex({ index, animated: true });
        }
    }));

    const getItemLayout = (_, index) => ({
        length: Dimensions.get('window').width,
        offset: Dimensions.get('window').width * index,
        index,
    });

    if (!Array.isArray(placeList) || placeList.length === 0) {
        return (
            <View>
                <Text>No places found.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={placeList}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            pagingEnabled
            getItemLayout={getItemLayout}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                <PlaceItem
                    place={item}
                    onPress={() => onNavigate(item.geometry.location.lat, item.geometry.location.lng)}
                />
            )}
        />
    );
});

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default PlaceList;
