import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/HomeScreen";
import MyAcount from "../pages/MyAcount";
import { NavigationContainer } from "@react-navigation/native";
import Puntuar from "../pages/Puntuar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import Registro from "../pages/Registro";
import Detalle from "../pages/Detalle";
import SeleccionRopaComunida from "../pages/SeleccionarRopaComunida";
import DetalleUnico from "../pages/DetalleUnico";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyStackLogin() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="registro"
        component={Registro}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="home"
        component={MyTab}
      />
    </Stack.Navigator>
  );
}

function StackCreacionConjunto() {
  return (
    <Stack.Navigator initialRouteName="SeleccionRopaComunidad">
      <Stack.Screen
        name="SeleccionRopaComunidad"
        component={SeleccionRopaComunida}
      />
      <Stack.Screen name="Detalle" component={DetalleUnico} />
    </Stack.Navigator>
  );
}

function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Conjuntos") {
            iconName = focused ? "shirt" : "shirt-outline";
          } else if (route.name === "Puntuar Conjuntos") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Cuenta") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Crear Conjunto") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#b880e7",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Conjuntos" component={HomeScreen} />
      <Tab.Screen
        name="Puntuar Conjuntos"
        component={Puntuar}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Crear Conjunto" component={StackCreacionConjunto} />
      <Tab.Screen name="Cuenta" component={MyAcount} />
    </Tab.Navigator>
  );
}

export default function Navegator() {
  return (
    <NavigationContainer>
      <MyStackLogin />
    </NavigationContainer>
  );
}
