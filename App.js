import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './routes/appNavigation';
import * as Font from 'expo-font';
import Loading from './components/loading';
import { createContext, useEffect, useState,} from 'react';
import LottieView from 'lottie-react-native';
// import SignUp from './screens/SignUp';
// import Login from './screens/Login';
import { usersData } from './data/users';
import LoginStack from './routes/LoginStack';
// import DrawerCopy from './routes/Drawercopy';
// import DrawerNavigator from './routes/Drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const myContext = createContext();

const getFonts = () => Font.loadAsync({
  'nunito-bold': require('./assets/Fonts/Nunito-Bold.ttf'),
  'nunito-regular': require('./assets/Fonts/Nunito-Regular.ttf'),
  'Montserrat-Bold': require('./assets/Fonts/Montserrat-Bold.ttf'),
  'Montserrat-ExtraBold': require('./assets/Fonts/Montserrat-ExtraBold.ttf'),
  'Montserrat-ExtraBoldItalic': require('./assets/Fonts/Montserrat-ExtraBoldItalic.ttf'),
  'Roboto-Bold': require('./assets/Fonts/Roboto-Bold.ttf'),
  'Roboto-Italic': require('./assets/Fonts/Roboto-Italic.ttf'),
  'Roboto-Regular': require('./assets/Fonts/Roboto-Regular.ttf'),
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState(null);
  const [isLogin, setisLogin] = useState(false);
  

  useEffect(() => {
    const loadApp = async () => {
      await getFonts();
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    loadApp();
    const fetchCredentials = async () => {
      try {
          const storedCredentials = await AsyncStorage.getItem('credentials');
          if (storedCredentials !== null) {
              const parsedCredentials = JSON.parse(storedCredentials);
              // console.log(parsedCredentials);
              setuser(parsedCredentials);
              setisLogin(true);
              // console.log(user)
          }
      } catch (error) {
          console.error('Error:', error.message);
      }
  };

  fetchCredentials();
  }, []);

  if(loading){
    return(
      // <Loading/>
      <View className='flex-1 bg-neutral-800'>
        <LottieView
          source={require('./assets/animations/Animation - 1711514293557.json')}
          autoPlay
          loop={true}
          style={styles.animation}
        />
      </View>
      
    )
  }

  return (
    
    <myContext.Provider value={{usersData, user, setuser, setisLogin}}>
      {isLogin?<AppNavigation/> :<LoginStack/>}
      {/* <LoginStack/> */}
      {/* <AppNavigation/> */}
      


    </myContext.Provider>
  );
}

const styles = StyleSheet.create({
  animation: {
    flex:1,
    alignSelf:'center',
    justifyContent:'center',
    width: 200,
    height: 200,
  },
});
