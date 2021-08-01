import { StyleSheet } from "react-native";

const appstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },

    item_title: {
        fontSize: 20,
        color: "red",
        margin: 5,
    },
    item_description: {
        fontSize: 12,
        color: "black",
        margin: 5,
    },
    item_views: {
        fontSize: 12,
        color: "black",
        margin: 5,
    },
    detail: {
        fontSize: 18,
        color:"red",
        fontWeight: "bold",
        textAlign: "left"
    },
    text: {
        fontSize: 12,
        color:"gray",
    },
 
    favcontainer: {
        flex: 1,
        padding: 20,
        // flexDirection: "column-reverse", // row-reverse
        flexDirection:  "row", //"row", // row-reverse
        justifyContent: "space-evenly" // "space-between" // space-evenly
    },

    separator:{
        padding: 10
    },

    thumb_image: {
        width: null,
        resizeMode: 'contain',
        height: 320
    },

})
export {appstyles}