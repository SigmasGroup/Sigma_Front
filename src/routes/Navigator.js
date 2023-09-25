import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import MyAcount from '../pages/MyAcount';
import { NavigationContainer } from '@react-navigation/native';
import Puntuar from '../pages/Puntuar';

const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Puntuar" component={Puntuar} />
      <Tab.Screen name="Cuenta" component={MyAcount} />
    </Tab.Navigator>
  );
}

export default function Navegator(){
  return(
    <NavigationContainer>
      <MyTab></MyTab>
    </NavigationContainer>
  )
}