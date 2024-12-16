import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Piano1 from './components/Piano1';  
import Piano2 from './components/Piano2';  
import Piano3 from './components/Piano3';  
import Home from './components/Home';  

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Piano1" 
          component={Piano1} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Piano2" 
          component={Piano2} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Piano3" 
          component={Piano3} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
