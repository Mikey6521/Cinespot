import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { fallbackMoviePoster, image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {

    const navigation =useNavigation();

    const handleClick=(item)=>{
        navigation.push('Movie',item);
    }

    return (
        <View className='mb-8'>
            <Text style={{fontFamily:'Montserrat-ExtraBoldItalic'}} className='text-white text-xl mx-4 mb-5'>TrendingMovies</Text>
            <Carousel
                data={data}
                renderItem={({item})=><MovieCard item={item} handleClick={handleClick}/>}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width*0.62}
                slideStyle={{display:'flex', alignItems:'center'}}
            />
        </View>
    );
}

const MovieCard=({item,handleClick})=>{
    return(
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <Image
            source={{ uri: item.poster_path?image500(item.poster_path):fallbackMoviePoster}}
            style={{
                width:width*0.6,
                height:height*0.4,
            
            }}
            className='rounded-3xl'
            />
        </TouchableWithoutFeedback>
    )
}

export default TrendingMovies;
