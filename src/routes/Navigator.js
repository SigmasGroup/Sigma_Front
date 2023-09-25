import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import MyAcount from '../pages/MyAcount';
import { NavigationContainer } from '@react-navigation/native';
import Puntuar from '../pages/Puntuar';
import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Conjuntos') {
              iconName = focused
                ? 'shirt'
                : 'shirt-outline';
            } else if (route.name === 'Puntuar Conjuntos') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'Cuenta') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <Tab.Screen name="Conjuntos" component={HomeScreen} />
      <Tab.Screen name="Puntuar Conjuntos" component={Puntuar} />
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