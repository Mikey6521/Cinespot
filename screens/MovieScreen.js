import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import {View, StyleSheet, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme';
import {LinearGradient} from 'expo-linear-gradient'
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500, searchMovieTrailer } from '../api/moviedb';
import YoutubePlayer from "react-native-youtube-iframe";
import { myContext } from '../App';
import axios from 'axios';


const {width, height} = Dimensions.get('window');
const ios =Platform.ios=='ios';
const topMargin=ios?'':'mt-3';

const MovieScreen = () => {
    const {params: item} = useRoute();
    const [isFavoutite, setIsFavorite] = useState();
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [videoId, setVideoId] = useState();
    const {user}=useContext(myContext);
    let movieName='Ant-Man and the Wasp: Quantumania';

    useEffect(()=>{
        setIsLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
        axios.get(`http://192.168.29.109:3001/users/${user.id}`)
        .then(response => {
            const favorites = response.data.favorites;
            setIsFavorite(favorites.some(favorite => favorite.id === item.id));
        })
        .catch(error => {
            console.error('Error checking favorites:', error);
        });
    },[item.id])

    const getMovieDetails = async(id)=>{
        const data = await fetchMovieDetails(id);
        setIsLoading(false);
        if(data){
            setMovie(data);
            const trailerVideoId = await searchMovieTrailer(data.title);
            if(trailerVideoId){
                setVideoId(trailerVideoId);
            } 
        } 

        
    }

    const getMovieCredits = async(id)=>{
        const data = await fetchMovieCredits(id);
        // console.log(data);
        if(data && data.cast){
            setCast(data.cast);
        }

        
    }

    const getSimilarMovies = async(id)=>{
        const data = await fetchSimilarMovies(id);
        // console.log(data);
        if(data && data.results) setSimilarMovies(data.results);
    }

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };


    const toggleFavorite = () => {
        const updatedUser = { ...user }; 
        const index = updatedUser.favorites.findIndex(fav => fav.id === item.id);
        if (index !== -1) {
          updatedUser.favorites.splice(index, 1);
        } else {
          updatedUser.favorites.push(movie);
        }
        axios.put(`http://192.168.29.109:3001/users/${user.id}`, updatedUser)
          .then(() => {
            setIsFavorite(index === -1); 
          })
          .catch(error => console.error('Error toggling favorite:', error));
      };
      

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom:20}}
            className='flex-1 bg-neutral-900'
        >
            <View className='w-full'>
                <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4'+topMargin}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className='rounded-xl p-1'>
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleFavorite}>
                        <HeartIcon size='35' color={isFavoutite?theme.background:'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    isLoading?(
                        <Loading/>
                    ):(
                        <View>
                                <Image
                                    source={{ uri: item.poster_path?image500(item.poster_path):fallbackMoviePoster}}
                                    style={{width, height:height*0.55}}
                                />
                            
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{width,height:height*0.4}}
                                start={{x:0.5, y:0}}
                                end={{x:0.5,y:1}}
                                className='absolute bottom-0'
                            />
                        </View>
                    )
                }

                
            </View>
            <View style={{marginTop:-(height*0.09)}} className='space-y-3'>
                <Text style={{fontFamily:'Roboto-Bold'}} className='text-white text-center text-3xl font-bold tracking-wider'>
                    {
                        movie?.title
                    }
                </Text>

                {
                    movie?.id && (
                        <Text style={{fontFamily:'Roboto-Regular'}} className='text-neutral-400 font-semibold text-base text-center'>
                            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                        </Text>
                    ) 
                }
                    

                <View className='flex-row justify-center mx-4 space-x-2'>


                    {
                        movie?.genres?.map((genre, index)=>{
                            let showDot = index+1 != movie.genres.length;
                            
                            return(
                                <Text style={{fontFamily:'Roboto-Italic'}} key={index} className='text-neutral-400 font-semibold text-base text-center'>
                                    {genre?.name} {showDot?'•':null}
                                </Text>
                            )
                        })
                    }

                </View>
                <View>
                    <Text numberOfLines={isExpanded ? null : 4} style={{fontFamily:'Roboto-Regular'}} className='text-neutral-400 mx-4 tracking-wide'>
                        {movie?.overview}
                    </Text>
                    
                    {movie?.overview && movie?.overview?.length > 200 && (
                        <TouchableOpacity onPress={toggleExpansion}>
                            <Text style={{fontFamily:'Roboto-Regular', color:'#eab308'}} className='text-neutral-400 mx-4 tracking-wide'>{isExpanded ? 'See Less' : 'See More'}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Cast navigation={navigation} cast={cast}/>
            {similarMovies.length>0 && <MovieList title='Similar Movies' data={similarMovies} hideSeeAll={true}/>}


                {!isLoading && <YoutubePlayer
                    height={300}
                    videoId={videoId}
                />}
            
            
                            
        </ScrollView>
    );

}



export default MovieScreen;
