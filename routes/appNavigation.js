// import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator, NavigationContainer } from "./Navigation";
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' options={{headerShown:false}} component={HomeScreen} />
                <Stack.Screen name='Movie' options={{headerShown:false}} component={MovieScreen} />
                <Stack.Screen name='Person' options={{headerShown:false}} component={PersonScreen} />
                <Stack.Screen name='Search' options={{headerShown:false}} component={SearchScreen} />
                <Stack.Screen name='liked' options={{headerShown:false}} component={FavoriteScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default AppNavigation;
