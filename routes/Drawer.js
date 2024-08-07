import React, { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";
import FlatButton from "../Shared/FlatButton";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myContext } from "../App";
// import { createDrawerNavigator,DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./appNavigation";
import { NavigationContainer, createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "./Navigation";
// import HomeScreen from '../screens/HomeScreen';


const Drawer = createDrawerNavigator();

// function NotificationsScreen({ navigation }) {
//   return (
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//   <Button onPress={() => navigation.goBack()} title="Go back home" />
//   </View>
//   );
//   }

export default function DrawerNavigator() {
  const { setisLogin } = useContext(myContext);

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to Log out',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('credentials');
              setisLogin(false);
            } catch (error) {
              console.error('Error:', error.message);
            }
          },
        },
      ]
    );
  };

  
  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1, height: 720 }}>
          <View style={styles.drawerContent}>
            <DrawerItem
              icon={() => <MaterialIcons name="home" size={24} color="#f01d71" />}
              label="Home"
              onPress={() => props.navigation.navigate("Home")}
            />
          </View>
          <View style={styles.logoutButtonContainer}>
            <FlatButton text="Logout" onPress={handleLogout} />
          </View>
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        // initialRouteName="HomeScreen"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: styles.drawerStyle,
        }}
      >
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        <Drawer.Screen name="HomeScreen" component={AppNavigation} />
      </Drawer.Navigator>
     </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 40,
  },
  logoutButtonContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'end'
  },
  drawerStyle: {
    backgroundColor: '#fff',
    width: 240,
  },
});
