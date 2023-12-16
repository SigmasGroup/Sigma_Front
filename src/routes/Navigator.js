import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyAcount from "../Screens/MyAcount";
import { NavigationContainer } from "@react-navigation/native";
import Puntuar from "../Screens/Puntuar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/login";
import Registro from "../Screens/Registro";
import SeleccionRopaComunida from "../Screens/SeleccionarRopaComunida";
import DetalleUnico from "../components/DetalleUnico";
import SeleccionRopa from "../Screens/SeleccionRopa";
import Detalle from "../components/Detalle";
import DetalleGuardado from "../components/detalleConjuntoGuardado";

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
      <Stack.Screen name="Crear Conjuntos" component={SeleccionRopaComunida} />
      <Stack.Screen name="Detalle Unico" component={DetalleUnico} />
    </Stack.Navigator>
  );
}

function StackFiltrarConjunto() {
  return (
    <Stack.Navigator initialRouteName="SeleccionRopa">
      <Stack.Screen name="Conjuntos" component={SeleccionRopa} />
      <Stack.Screen name="Detalle" component={Detalle} />
    </Stack.Navigator>
  );
}

function StackMyAcount() {
  return (
    <Stack.Navigator initialRouteName="MyAcount">
      <Stack.Screen name="Cuenta" component={MyAcount} />
      <Stack.Screen name="DetalleGuardado" component={DetalleGuardado} />
    </Stack.Navigator>
  );
}

function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Conjunto") {
            iconName = focused ? "shirt" : "shirt-outline";
          } else if (route.name === "Puntuar Conjuntos") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "MiCuenta") {
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
      <Tab.Screen
        name="Conjunto"
        component={StackFiltrarConjunto}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Tab.Screen name="Puntuar Conjuntos" component={Puntuar} />
      <Tab.Screen
        name="Crear Conjunto"
        component={StackCreacionConjunto}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MiCuenta"
        component={StackMyAcount}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
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
