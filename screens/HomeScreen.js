import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles, theme } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopratedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import LottieView from 'lottie-react-native';
import { HeartIcon } from 'react-native-heroicons/solid'

const ios =Platform.ios=='ios'
const HomeScreen = () => {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [toprated, setToprated] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation()

    useEffect(()=>{
        setIsLoading(true);
        getTrendingMovies();
        getUpcomingMovies();
        getTopratedMovies();
    },[])

    const getTrendingMovies = async()=>{
        const data = await fetchTrendingMovies();
        if(data && data.results){
            setTrending(data.results);
            setIsLoading(false)
        }
    }

    const getUpcomingMovies = async()=>{
        const data = await fetchUpcomingMovies();
        if(data && data.results){
            setUpcoming(data.results)
        }
    }

    const getTopratedMovies = async()=>{
        const data = await fetchTopratedMovies();
        // console.log(data);
        if(data && data.results){
            setToprated(data.results)
        }
    }

    return (
        <View className='flex-1 bg-neutral-800'>
            <SafeAreaView className={ios?'-mb-2': 'mb-3'}>
                <StatusBar style='light'/>
                    <View className='flex-row justify-between items-center mx-4'> 
                        <TouchableOpacity onPress={()=>navigation.navigate('liked')}>
                            {/* <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white' /> */}
                            <HeartIcon size='35' color={theme.background} />
                        </TouchableOpacity>
                        
                        <Text
                        className='text-white text-3xl font-bold'
                        >
                            <Text style={styles.text}>M</Text>ovies
                        </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                            <MagnifyingGlassIcon size='38' strokeWidth={2} color='white' />
                        </TouchableOpacity>
                    </View>
            </SafeAreaView>

            {
                isLoading?(
                    <Loading/>
                ):(
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:10}}
                    >
                        {trending.length>0 && <TrendingMovies data={trending}/>}

                        {upcoming.length>0 && <MovieList data={upcoming} title='Upcoming'/>}

                        {toprated.length>0 && <MovieList data={toprated} title='Top Rated'/>}
                    </ScrollView>
                    )
            }
        </View>
    );
}



export default HomeScreen;
