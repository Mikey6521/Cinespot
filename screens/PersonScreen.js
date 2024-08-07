import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Platform, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetils, fetchPersonMovies, image342 } from '../api/moviedb';

const {width, height} = Dimensions.get('window');
const ios =Platform.ios=='ios';
const verticalMargin=ios?'':'my-3';
const PersonScreen = () => {
    const {params: item} = useRoute();
    const [isFavoutite, toggleFavoutite] = useState();
    const navigation = useNavigation();
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
        // console.log(item);
    },[item])


    const getPersonDetails =async id=>{
        const data = await fetchPersonDetils(id);
        if(data) setPerson(data);
        setIsLoading(false);
        // console.log(data);
    }

    const getPersonMovies =async id=>{
        const data = await fetchPersonMovies(id);
        if(data && data.cast){
            setPersonMovies(data.cast);
        }
        // console.log('personmovies: ',data);
    }

    return (
        <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{padding:20}}>
            <SafeAreaView className={'z-20 w-full flex-row justify-between items-center px-4'+verticalMargin}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className='rounded-xl p-1'>
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>toggleFavoutite(!isFavoutite)}>
                        <HeartIcon size='35' color={isFavoutite?'red':'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    isLoading?(
                        <Loading/>
                    ):(
                        <View>
                            <View className='flex-row justify-center'
                                style={{
                                    shadowColor:'gray',
                                    shadowRadius:40,
                                    shadowOffset:{width:0, height:5},
                                    shadowOpacity:1
                                }}
                            >
                                <View className='items-center rounded-full overflow-hidden w-72 h-72 border border-neutral-500'>
                                    <Image 
                                        // source={require('../assets/Keanu.webp')}
                                        source={{uri:person?.profile_path?image342(person?.profile_path):fallbackPersonImage}}
                                        style={{width:width*0.74, height:height*0.43}}
                                    />
                                </View>
                            </View>

                            <View className='mt-6'>
                                <Text style={{fontFamily:'Montserrat-Bold'}} className='text-white text-3xl text-center font-bold'>
                                    {
                                        person?.name
                                    }
                                </Text>
                                <Text style={{fontFamily:'Roboto-Regular'}} className='text-neutral-500 text-base text-center'>
                                    {
                                        person?.place_of_birth
                                    }
                                </Text>
                            </View>

                            <View className='mx-3 p-4 mt-6 flex-row justify-center items-center bg-neutral-700 rounded-full'>
                                <View className='border-r-2 border-neutral-400 px-2 items-center'>
                                    <Text style={{fontFamily:'Roboto-Regular'}} className='font-semibold text-white'>Gender</Text>
                                    <Text style={{fontFamily:'Roboto-Italic'}} className='text-sm text-neutral-300'>{
                                        person?.gender==1?'male':'female'
                                    }</Text>
                                </View>
                                <View className='border-r-2 border-neutral-400 px-2 items-center'>
                                    <Text style={{fontFamily:'Roboto-Regular'}} className='font-semibold text-white'>Birthday</Text>
                                    <Text style={{fontFamily:'Roboto-Italic'}} className='text-sm text-neutral-300'>{person?.birthday}</Text>
                                </View>
                                <View className='border-r-2 border-neutral-400 px-2 items-center'>
                                    <Text style={{fontFamily:'Roboto-Regular'}} className='font-semibold text-white'>Known for</Text>
                                    <Text style={{fontFamily:'Roboto-Italic'}} className='text-sm text-neutral-300'>{person?.known_for_department}</Text>
                                </View>
                                <View className='px-2 items-center'>
                                    <Text style={{fontFamily:'Roboto-Regular'}} className='font-semibold text-white'>Popularity</Text>
                                    <Text style={{fontFamily:'Roboto-Italic'}} className='text-sm text-neutral-300'>{person?.popularity?.toFixed(2)}%</Text>
                                </View>
                            </View>
                            <View className='mx-4 my-6 space-y-2'>
                                <Text style={{fontFamily:'Roboto-Regular'}} className='text-white text-lg'>Biography</Text>
                                <Text numberOfLines={isExpanded?null:5} style={{fontFamily:'Roboto-Regular'}} className='tracking-wide text-neutral-400'>
                                    {
                                        person?.biography || 'N/A'
                                    }
                                </Text>
                                {
                                    person?.biography && person?.biography?.length>200 &&
                                    <TouchableOpacity onPress={()=>{setIsExpanded(!isExpanded)}}>
                                        <Text style={{fontFamily:'Roboto-Regular', color:'#eab308'}} className='tracking-wide text-neutral-400'>
                                    {
                                        isExpanded?'See Less':'See More'
                                    }
                                </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            
                            <MovieList title='Movies' data={personMovies} hideSeeAll={true}/>
                        </View>
                        )
                }
        </ScrollView>
    );
}


export default PersonScreen;
