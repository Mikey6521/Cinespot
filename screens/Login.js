import React, {useContext, useState} from 'react';
import { View, StyleSheet, TextInput, Text, Platform, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../Shared/FlatButton';
import { myContext } from '../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { readDataFromDatabase } from '../data/firebase';

import { styles } from '../theme';

const ios =Platform.ios=='ios'

export default function Login() {
    const [bool, setbool] = useState(true);
    const {user, setuser, setisLogin} = useContext(myContext);
    
      const checkCredentials = async (values) => {
        
        // console.log(db);
        const { username, password } = values;
        try {
            // const response = await axios.get('http://192.168.29.109:3001/users');
            // console.log(response.data)
            const db = await readDataFromDatabase();
            // console.log('db',db);
            const user = db;
            const res1 = user.find(item=>item.username===username && item.password===password);
            const res2 = user.find(item=>item.password===password);
            // const isValidUser = users.some(user => user.username === username && user.password === password);
            if (res1 && res2) {
                setuser(res1);
                // console.log(user);
                setisLogin(true);
                await AsyncStorage.setItem('credentials', JSON.stringify(res1));
                // navigation.navigate('Home');
                
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to authenticate user. Please try again.');
        }
    };

  return (
    <View className='flex-1 bg-neutral-800'>
      <SafeAreaView className={ios?'-mb-2': 'mb-0'}>
                {/* <StatusBar style='light'/> */}
                    <View className='flex-row justify-center items-center mx-4'> 
                        {/* <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white' /> */}
                        <Text
                        className='text-white text-3xl font-bold'
                        >
                            <Text style={styles.text}>M</Text>ovies
                        </Text>
                        {/* <TouchableOpacity onPress={()=>console.log('object')}>
                            <MagnifyingGlassIcon size='38' strokeWidth={2} color='white' />
                        </TouchableOpacity> */}
                    </View>
            </SafeAreaView>
      
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, actions) => {
          // console.log('clicked')

          checkCredentials(values);
          actions.resetForm();
        }}
      >
        {(props) => (
          <View style={Styles.login}>
            <View className='items-center justify-center'>
            <Text className='text-neutral-100 text-3xl mb-6'>Login</Text>
            </View>
            
            <TextInput
              style={[Styles.input]}
              placeholder="Username"
              onChangeText={props.handleChange('username')}
              value={props.values.username}
              placeholderTextColor= '#757575' 
            />
            <TextInput
              style={Styles.input}
              placeholder="Password"
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              secureTextEntry
              placeholderTextColor= '#757575' 
              // className='text-white text-lg'
            />
            <FlatButton 
            text="Login" 
            onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const Styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
    color:'white'
  },
  login:{
    padding:20,
    marginTop:15
  }
});
