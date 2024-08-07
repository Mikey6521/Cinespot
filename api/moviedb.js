import axios from "axios";
import {apiKey, yapiKey} from '../constants';
import userFallbackImage from '../assets/user.webp'
import movieFallbackImage from '../assets/movie_poster.webp'



const apiBaseUrl = 'https://api.themoviedb.org/3';

const trendingMoviesEndpoint =`${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint =`${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topratedMoviesEndpoint =`${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint =`${apiBaseUrl}/search/movie?api_key=${apiKey}`;


const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMovieEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEnpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEnpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;



export const image500 = path=>path?`https://image.tmdb.org/t/p/w500${path}`:null;
export const image342 = path=>path?`https://image.tmdb.org/t/p/w342${path}`:null;
export const image185 = path=>path?`https://image.tmdb.org/t/p/w185${path}`:null;

export const fallbackMoviePoster ='https://imgs.search.brave.com/BuzK8sYUqWKRIhb7JtqBfhoDIv0DMiecE38BSQwf0Hk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzEyLzUyLzkx/LzM2MF9GXzIxMjUy/OTE5M19ZUmhjUUNh/SkI5dWd2NWRGenFL/MjVVbzlJdm03QjlD/YS5qcGc';
export const fallbackPersonImage ='https://imgs.search.brave.com/swltVmzqVmPnf6QxTWZbTiEmvCCvN-bPbotwY707iOg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n';

const apiCall = async(endpoint, params)=>{
    const options={
        method:'GET',
        url: endpoint,
        params:params?params:{}
    }
    
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
};

export const searchMovieTrailer = async (movieTitle) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: yapiKey,
          q: `${movieTitle} movie trailer`,
          part: 'snippet',
          type: 'video',
          maxResults: 10,
        //   order: 'viewCount',
        },
      });    
      const videoId = response.data.items[0].id.videoId;  
      return videoId;
    } catch (error) {
      console.error('Error searching for movie trailer:', error);
      return null;
    }
  };


export const fetchTrendingMovies=()=>{
    return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies=()=>{
    return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopratedMovies=()=>{
    return apiCall(topratedMoviesEndpoint);
};

export const fetchMovieDetails = id =>{
    return id?apiCall(movieDetailsEndpoint(id)):null;
}

export const fetchMovieCredits = id =>{
    return id?apiCall(movieCreditsEndpoint(id)):null;
}

export const fetchSimilarMovies = id =>{
    return id?apiCall(similarMovieEndpoint(id)):null;
}

export const fetchPersonDetils = id =>{
    return id?apiCall(personDetailsEnpoint(id)):null;
}

export const fetchPersonMovies = id =>{
    return id?apiCall(personMoviesEnpoint(id)):null;
}

export const searchMovies = params =>{
    return apiCall(searchMoviesEndpoint,params)
}

