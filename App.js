// App.js
import React, { useEffect } from "react"; 
import { Platform, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications"; // 👈 import notifications
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskProvider } from './src/context/taskprovider';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import { ThemeProvider } from "./src/context/themeprovider";

const Stack = createNativeStackNavigator();

export default function App() {
   useEffect(() => {
    async function registerNotifications() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("You need to enable notifications to get task reminders.");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    }

    registerNotifications();
  }, []);
  return (
    <ThemeProvider>
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
          <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
