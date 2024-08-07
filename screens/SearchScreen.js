import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {View, StyleSheet, Text, Dimensions, Platform, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/loading';
import { debounce } from 'lodash';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';


const {width, height} = Dimensions.get('window');
const ios =Platform.ios=='ios';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let movieName='Ant-Man and the Wasp: Quantumania';
    const handleSearch = value =>{
        if(value && value.length>2){
            setIsLoading(true);
            searchMovies({
                query:value,
                include_adult:false,
                language:'en-US',
                page:1
            }).then(data=>{
                setIsLoading(false);
                // console.log("got movies: ",data)
                if(data && data.results){
                    setResults(data.results);
                }
            })
        }else{
            setIsLoading(false);
            setResults([]);
        }
        

    }

    const handleTextDebounce = useCallback(debounce(handleSearch,300),[]);
    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <View
                className='mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full'
            >
                <TextInput
                onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
                />

                <TouchableOpacity
                    onPress={()=>{navigation.navigate('Home')}}
                    className='rounded-full p-3 m-1 bg-neutral-500'
                >
                    <XMarkIcon size={25} color='white'/>
                </TouchableOpacity>
            </View>

            {
                isLoading?(
                    <Loading/>
                ):
                results.length>0?(
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{padding:15}}
                        className='space-y-3'
                    >
                        <Text className='text-white font-semibold ml-1'>Results({results.length})</Text>
                        <View className='flex-row justify-between flex-wrap'>
                            {
                                results.map((item, index)=>{
                                    return(
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={()=>navigation.push('Movie', item)}
                                        >
                                            <View className='space-y-2 mb-4'>
                                                <Image className='rounded-3xl'
                                                    // source={require('../assets/ant.webp')}
                                                    source={{uri: item?.poster_path ? image185(item.poster_path) : fallbackMoviePoster}}

                                                    style={{
                                                        width:width*0.44,
                                                        height:height*0.3
                                                    }}
                                                />
                                                <Text className='text-neutral-300 ml-1'>
                                                    {
                                                        item?.title.length>22?item?.title.slice(0,22)+'...':item?.title
                                                    }
                                                </Text>
                                            </View>
                                            
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    )
                :(
                    <View className='flex-row justify-center mt-20'>
                        <Image source={require('../assets/noresults.png')}
                            className='w-75 h-75'/>
                    </View>
                )
            }

            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default SearchScreen;
