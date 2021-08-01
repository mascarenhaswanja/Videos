import React, { useState, useEffect } from 'react';
import {View, Text, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, Button} from 'react-native';
import { appstyles } from '../utilities/Styles';

function ListScreen({navigation, route}) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getVideosFromAPI = () => {
        const videoURL = "https://api.dailymotion.com/user/x1audmk/videos?limit=20"
        return fetch(videoURL)
        .then( (response) => response.json()
                .then( (json) => { 
                    setData(json.list)})
                .catch( (error) =>  {console.log(error)})
                .finally( () => {setIsLoading(false)} )
        )
    }

    useEffect( () => {getVideosFromAPI()}, [])

    return (
        <SafeAreaView style={appstyles.container}>
            <Text style={appstyles.title}>Videos from Wired Magazine</Text>
            <Button title="View Favorites" 
                onPress = {() => {
                    console.log("Navigating to Favorites- navigation.navigate(FavScreen)");
                    navigation.navigate("Fav");
                    }
                } 
            />
            { isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
                <FlatList
                data = {data}
                keyExtractor = { (item, index) => { return item["id"] }} 
                renderItem = { ( {item} ) => (
                <TouchableOpacity onLongPress={ () => { 
                    console.log(" selected: ", item.title)
                    navigation.navigate("Detail", {itemSelected: item.id});
                     }}>
                    <View>
                        <Text style={appstyles.item_title}>{item.title}</Text>
                    </View>
                    <View  style={appstyles.separator}/>
                </TouchableOpacity>)}
                />
            )}
        </SafeAreaView>
    );
}
export default ListScreen;
