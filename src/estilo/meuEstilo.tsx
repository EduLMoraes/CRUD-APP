import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {  
        backgroundColor:    'black',
        alignItems:         'center',
        justifyContent:     'center',
        display:            'flex',
        flexDirection:      'row',
        flexWrap:           'wrap',
    },

    titulo: {
        fontSize:           50,
        paddingBottom:      20,
        alignSelf:          'center',
        flexGrow:           12
    },

    pesquisa: {
        backgroundColor:    "white",
        height:             40,
        width:              200,
        borderRadius:       30,
        borderColor:        'gray',
        alignSelf:          'center',
        marginLeft:         80,
    },
    pesquisatxt:{
        flexGrow:           1,
        height:             40,
        width:              20,
        borderRadius:       30,
        borderColor:        'gray',
    },

    textInput:{
        alignItems:         "center", 
        width:              200, 
        height:             40, 
        borderColor:        'gray', 
        borderWidth:        1,
        color:              'white',
    },
    containerTouch:{
        width:              200,
        paddingTop:         0,
        margin: 20
    },
    containerTxt:{
        flexGrow:           1,
        height:             40,
        width:              20,
        borderRadius:       30,
        borderColor:        'gray',
    }
});