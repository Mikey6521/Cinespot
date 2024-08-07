import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image} from 'react-native';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, image500 } from '../api/moviedb';

const {width, height} = Dimensions.get('window')

const MovieList = ({title, data, hideSeeAll}) => {
    const navigation =useNavigation();
    let movieName='Ant-Man and the Wasp: Quantumania';
    return (
        <View className='mb-8 space-y-4'>
            <View className='mx-4 flex-row justify-between items-center'>
                <Text style={{fontFamily:'Montserrat-ExtraBoldItalic'}} className='text-white text-xl'>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text}>See All</Text>
                        </TouchableOpacity>
                    )
                }
                
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{padding:15}}
            >
                {
                    data.map((item, index)=>{
                        return(
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={()=>navigation.push('Movie',item)}
                            >
                                <View className='space-y-4 mr-4'>
                                    <Image
                                        source={{ uri: item.poster_path?image185(item.poster_path):fallbackMoviePoster}}
                                        className='rounded-3xl'
                                        style={{width:width*0.33,height:height*0.22}}
                                    />
                                    <Text style={{fontFamily:'Roboto-Regular'}} className='text-neutral-300 ml-1'>
                                        {
                                            item?.title?.length>14?item?.title?.slice(0,14)+'...':item?.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}



export default MovieList;
