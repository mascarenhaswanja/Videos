import React, { useState, useEffect } from 'react';
import {View, Text,  SafeAreaView, ActivityIndicator, FlatList, Button, TouchableOpacity} from 'react-native';
import { appstyles } from '../utilities/Styles';
import { db } from "../utilities/FirebaseManager"

function FavScreen({navigation, route}){
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [buttonEnabled, setButtonEnabled] = useState(true)
    let videos = []

    const getAllFavorites = () => {
        console.log("Fav - Get All Favorites") 
        db.collection("favorites").get().then((querySnapshot) => {
          querySnapshot.forEach((documentFromFirestore) => {
            console.log(`${documentFromFirestore.id}, ${JSON.stringify(documentFromFirestore.data())}`)
            const fav = {
                id:  documentFromFirestore.data().id,
                title: documentFromFirestore.data().title
            }
            console.log("Fav Firestore ",fav)
            videos.push(fav)
          });
          if (videos.length === 0) {
              alert("No favorites found")
              setButtonEnabled(false)
          }
          setData(videos)
        });
        setIsLoading(false)
       console.log("Videos ",videos)
    }

    useEffect( () => {getAllFavorites()}, [])

    const clearFavorites = () => {
        console.log("Delete All Favorites") 
        db.collection("favorites").get().then(querySnapshot => {
            querySnapshot.docs.forEach(snapshot => {
                snapshot.ref.delete();
            })
        })
        setData("")
        setButtonEnabled(false)
    }

    return (
        <SafeAreaView>
        <Text style={appstyles.title}>My Favorites</Text>
        <Button title="Clear Favorites" disabled={!buttonEnabled} onPress={clearFavorites}/>
        { isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
            <FlatList
            data = {data}
            keyExtractor = { (item, index) => { return item.id }} 
            renderItem = { ( {item} ) => (
            <TouchableOpacity  onLongPress={ () => { 
                console.log(` Selected: ${item.id} ${item.title}`)
                navigation.navigate("Detail", {itemSelected: item.id})
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

export default FavScreen;

//Pressable 