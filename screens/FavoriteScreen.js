import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { myContext } from '../App';

const { width, height } = Dimensions.get('window');
const ios = Platform.ios == 'ios';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const {user} =useContext(myContext);

  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <View
        className='mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full'
      >
        <Text className='pb-1 pl-6 flex-1 text-xl font-semibold text-white tracking-wider'>
          Favorite Movies
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          className='rounded-full p-3 m-1 bg-neutral-500'
        >
          <XMarkIcon size={25} color='white' />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 15 }}
        className='space-y-3'
      >
        <Text className='text-white font-semibold ml-1'>
          Favorites({user.favorites.length})
        </Text>
        {
            user?.favorites?.length>0?(
                <View className='flex-row justify-between flex-wrap'>
                    {user.favorites.map((item, index) => {
                        return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.push('Movie', item)}
                        >
                            <View className='space-y-2 mb-4'>
                            <Image
                                className='rounded-3xl'
                                source={{
                                uri: item?.poster_path
                                    ? image185(item.poster_path)
                                    : fallbackMoviePoster,
                                }}
                                style={{
                                width: width * 0.44,
                                height: height * 0.3,
                                }}
                            />
                            <Text className='text-neutral-300 ml-1'>
                                {item?.title?.length > 22
                                ? item?.title?.slice(0, 22) + '...'
                                : item?.title}
                            </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        );
                    })}
                    </View>
            ):(
                <View className='flex-row justify-center mt-20'>
                    <Image source={require('../assets/noresults.png')}
                        className='w-75 h-75'/>
                </View>
            )
        }
        
      </ScrollView>
    </SafeAreaView>
  );
};


export default FavoriteScreen;
