import firebase from 'firebase/app';
import 'firebase/database';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { get, getDatabase, push } from "firebase/database";
import {ref, DataSnapshot} from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyAMrIJV_3fNjLWGxqQk2gCPir0GUatHqUY",
  authDomain: "movie-app-268aa.firebaseapp.com",
  databaseURL: "https://movie-app-268aa-default-rtdb.firebaseio.com",
  projectId: "movie-app-268aa",
  storageBucket: "movie-app-268aa.appspot.com",
  messagingSenderId: "455310366682",
  appId: "1:455310366682:web:a6acaca7474cc0c0d552e3",
  measurementId: "G-YYDQ1GC305"
};


const app = initializeApp(firebaseConfig);


const db = getDatabase(app);

export const writeDataToDatabase = async (data) => {
  try {
    // await database.ref('users').push(data);
    console.log('firebasse data',data)
    const uref = ref(db,'users');
    console.log(uref)
    push(uref,data).then(() => {console.log('Data written to the database');})
  } catch (error) {
    console.error('Error writing to the database:', error.message);
    throw error;
  }
};

export const readDataFromDatabase = async () => {
  try {
      
      const uref = ref(db, 'users');
      const snapshot = await get(uref);
      const dataArray = [];
        snapshot.forEach((childSnapshot) => {
            dataArray.push(childSnapshot.val());
        });
        console.log('Data read from the database:', dataArray);
        return dataArray;
  } catch (error) {
      console.error('Error reading from the database:', error.message);
      throw error;
  }
};
