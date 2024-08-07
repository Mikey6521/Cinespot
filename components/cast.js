import React from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import { fallbackPersonImage, image185 } from '../api/moviedb';

const Cast = ({cast, navigation}) => {
    let characterName='John Wick';
    let personName= 'Keanu Reeves'
    return (
        <View className='my-6'>
            <Text style={{fontFamily:'Roboto-Regular'}} className='text-white test-lg mx-4 mb-5'>Top Cast</Text>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
            >
                {
                    cast && cast.map((person, index)=>{
                        return(
                            <TouchableOpacity 
                                key={index}
                                className='mr-4 items-center'
                                onPress={()=>navigation.navigate('Person',person)}
                            >
                                <View
                                    className='overflow-hidden rounded-full h-20 w-20, items-center border border-neutral-500'
                                >
                                    <Image
                                        className='rounded-2xl h-24 w-20'
                                        // source={require('../assets/Keanu.webp')}
                                        source={{uri: person?.profile_path?image185(person?.profile_path):fallbackPersonImage}}
                                    />
                                </View>
                                <Text style={{fontFamily:'Roboto-Italic'}} className='text-white text-xs mt-1'>
                                    {
                                        person?.character.length>10?person?.character.slice(0,10)+'...':person?.character
                                    }
                                </Text>
                                <Text style={{fontFamily:'Roboto-Regular'}} className='text-neutral-400 text-xs mt-1'>
                                    {
                                        person?.original_name.length>10?person?.original_name.slice(0,10)+'...':person?.original_name
                                    }
                                </Text>

                            </TouchableOpacity>

                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

export default Cast;
