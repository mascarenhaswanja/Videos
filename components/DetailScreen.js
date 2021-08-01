import React, { useState, useEffect }  from 'react';
import {View, Text, SafeAreaView, Button, Image} from 'react-native';
import { appstyles } from '../utilities/Styles';
import { db } from "../utilities/FirebaseManager"

function DetailScreen ({navigation, route}) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
 
    const {itemSelected} = route.params;
     
    console.log("Detail - dailyMotionVideoId ",  itemSelected)

    const getVideoFromAPI = () => {
        // https://api.dailymotion.com/video/dailyMotionVideoId?fields=thumbnail_240_url,description,views_total,title,created_time
        const videoURL = "https://api.dailymotion.com/video/" + itemSelected + "?fields=thumbnail_240_url,description,views_total,title,created_time,id"
// x83194v
// https://api.dailymotion.com/video/x83194v?fields=thumbnail_240_url,description,views_total,title,created_time
        return fetch(videoURL)
        .then( (response) => response.json()
                .then( (json) => { 
                    console.log("Video Detail",json)
                    setData(json) })
                .catch( (error) =>  {console.log(error)})
                .finally( () => {setIsLoading(false)} )
        )
    }

    useEffect( () => {getVideoFromAPI()}, [])

    const saveFavorite = () => {
       const video =  {
           id: data.id,
           title: data.title}
       db.collection("favorites").add(video)
           .then(
               (doc)=>{
                   console.log(`Document saved: ${doc.id}`)
               }
           ).catch(
               (err)=> {
                   console.log(`Error saving video ${err}`)
               }
           )
    }
 
    return (
        <SafeAreaView style={appstyles.detailcontainer}>
            <Button title="FAVOURITE" onPress={saveFavorite}/>
            <Image style={appstyles.thumb_image} source={ {uri: data.thumbnail_240_url} }/>
            <Text style={appstyles.item_title}>{data.title}</Text>
            <Text style={appstyles.item_description}>{data.description}</Text> 
            <Text style={appstyles.item_views}>VIEWS: {data.views_total}</Text>
        </SafeAreaView>
    );
}

export default DetailScreen;