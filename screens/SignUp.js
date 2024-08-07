import React, {useContext} from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../Shared/FlatButton';
import axios from 'axios';
import { myContext } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import db from "@react-native-firebase/database";
import { writeDataToDatabase } from '../data/firebase';


const ios =Platform.ios=='ios'

const LoginSchema = yup.object({
  username: yup.string().required(),
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least 8 characters, one letter, one number and one special character'
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function SignUp({navigation}) {
    const {setuser,usersData, setisLogin} = useContext(myContext);
    
    // const addUser = async (values) => {
    //     try {
    //       console.log('hi')
          
          
    //       const { confirmPassword, ...userWithoutConfirmPassword } = values;
    //       const data ={...userWithoutConfirmPassword, URI:null, favorites:[] };
    //       console.log(data);
    //       const response = await axios.post('http://192.168.29.109:3001/users', data);
          
    //       console.log('User added successfully:', response.data);

    //       setuser(data);
    //       alert("User added successfully");
    //       setisLogin(true);
    //       await AsyncStorage.setItem('credentials', JSON.stringify(data));
    //     } catch (error) {
    //       if (error.response) {
    //         console.error('Server Error:', error.response.data);
    //       } else if (error.request) {
    //         console.error('Network Error:', error.request);
    //       } else {
    //         console.error('Error:', error.message);
    //       }
    //       alert('Failed to add user. Please check your network connection and try again.');
    //     }
    //   };





const addUser = async (values) => {
  try {
      
      const { confirmPassword, ...userWithoutConfirmPassword } = values;
      // console.log(firebase);
      // const usersRef = firebase.database().ref('users');
      const data ={URI:null, favorites:[], ...userWithoutConfirmPassword };
      // console.log(data)
      // const newUserRef = await usersRef.push({...userWithoutConfirmPassword, URI:null, favorites:[] });
      // const newUserId = newUserRef.key;
      // const snapshot = await usersRef.child(newUserId).once('value');
      // const newUser = snapshot.val();
      writeDataToDatabase(data);
      console.log('setuser dta', data);
      setuser(data);
      setisLogin(true);
      await AsyncStorage.setItem('credentials', JSON.stringify(data));
      alert("User added successfully");
  } catch (error) {
      console.error('Error adding user:', error.message);
      alert('Failed to add user. Please check your network connection and try again.');
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
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                            <MagnifyingGlassIcon size='38' strokeWidth={2} color='white' />
                        </TouchableOpacity> */}
                    </View>
            </SafeAreaView>
      <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
          <Formik
          initialValues={{
              username: '',
              fullName: '',
              email: '',
              password: '',
              confirmPassword: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
              const user= async()=>{
                  await addUser({...values});
                  
                  actions.resetForm();
              }
              user();
          }}
          >
          {(props) => (
              <View style={Styles.signup}>
                  <View style={{flexDirection:'row',justifyContent:'center', marginBottom:20 }}>
                    <Text className='text-neutral-300 text-3xl'>Create account</Text>
                  </View>
                  
              <TextInput
                  style={Styles.input}
                  placeholder="Username"
                  onChangeText={props.handleChange('username')}
                  value={props.values.username}
                  onBlur={props.handleBlur('username')}
                  placeholderTextColor= '#757575'
              />
              <Text style={Styles.errorText}>
                  {props.touched.username && props.errors.username}
              </Text>

              <TextInput
                  style={Styles.input}
                  placeholder="Full Name"
                  onChangeText={props.handleChange('fullName')}
                  value={props.values.fullName}
                  onBlur={props.handleBlur('fullName')}
                  placeholderTextColor= '#757575'
              />
              <Text style={Styles.errorText}>
                  {props.touched.fullName && props.errors.fullName}
              </Text>

              <TextInput
                  style={Styles.input}
                  placeholder="Email"
                  onChangeText={props.handleChange('email')}
                  placeholderTextColor= '#757575'
                  value={props.values.email}
                  onBlur={props.handleBlur('email')}
              />
              <Text style={Styles.errorText}>
                  {props.touched.email && props.errors.email}
              </Text>

              <TextInput
                  style={Styles.input}
                  placeholder="Password"
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  onBlur={props.handleBlur('password')}
                  secureTextEntry
                  placeholderTextColor= '#757575'
              />
              <Text style={Styles.errorText}>
                  {props.touched.password && props.errors.password}
              </Text>

              <TextInput
                  style={Styles.input}
                  placeholder="Confirm Password"
                  onChangeText={props.handleChange('confirmPassword')}
                  value={props.values.confirmPassword}
                  onBlur={props.handleBlur('confirmPassword')}
                  placeholderTextColor= '#757575'
                  // secureTextEntry
              />
              <Text style={Styles.errorText}>
                  {props.touched.confirmPassword && props.errors.confirmPassword}
              </Text>
              <FlatButton text="Sign Up" onPress={props.handleSubmit} />
              <View style={Styles.existinguser}>
                  <Text style={Styles.text} className='text-neutral-300'>Already an existing user?</Text>
                  <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                      <Text style={Styles.link}>Login</Text>
                  </TouchableOpacity>
              </View>
              
              </View>
          )}
          </Formik>
      </ScrollView>
    </View>
    
  );
}

const Styles = StyleSheet.create({
    signup:{
        padding:20,
        // marginTop:10,
        // justifyContent:'center'
        },
  createaccount:{
    fontSize:24,
    fontWeight:'bold',
    
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
    color:'white'
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 6,
    textAlign: 'center',
  },
  existinguser:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:20
  },
  text:{
    fontSize:18,
    paddingHorizontal:5
  },
  link:{
    fontSize:18,
    color:'blue',
    textDecorationLine:'underline'
  }
});
