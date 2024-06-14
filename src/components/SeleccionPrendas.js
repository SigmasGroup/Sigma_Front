// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
// } from "react-native";

// import Card from "./Card";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import GlobalApi from "../services/GlobalApi";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const SeleccionPrendas = ({ tipo, respuesta }) => {
//   const [selectedPrendas, setSelectedPrendas] = useState([]);
//   const tiposPrenda = ["cabeza", "torso", "piernas", "pies"];
//   const scrollViewRef = useRef(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const navigation = useNavigation();

//   // Función para manejar el movimiento al siguiente slider
//   const handleNext = () => {
//     if (currentPage < tiposPrenda.length - 1) {
//       scrollViewRef.current.scrollTo({
//         animated: true,
//         x: (currentPage + 1) * Dimensions.get("window").width,
//       });
//       setCurrentPage(currentPage + 1);
//     } else {
//       handelNavigat(tipo, selectedPrendas);
//     }
//   };
//   const handelNavigat = async (tipo, idRopas) => {
//     if (tipo === "armario") {
//       const storedUserId = await AsyncStorage.getItem("id");
//       await GlobalApi.putArmarioUser(storedUserId, idRopas);
//       navigation.navigate("home");
//     } else {
//       navigation.navigate("Detalle", { data: selectedPrendas });
//     }
//   };
//   // Función para manejar el desplazamiento entre sliders
//   const handleScroll = (event) => {
//     const slideIndex = Math.round(
//       event.nativeEvent.contentOffset.x / Dimensions.get("window").width
//     );
//     setCurrentPage(slideIndex);
//   };

//   // Función para manejar la selección de tarjetas
//   const handleSelectCard = (id) => {
//     if (selectedPrendas.includes(id)) {
//       setSelectedPrendas(selectedPrendas.filter((prendaId) => prendaId !== id));
//     } else {
//       setSelectedPrendas([...selectedPrendas, id]);
//     }
//   };

//   // Función para filtrar las prendas por tipo
//   const filtrarPrendasPorTipo = (tipo) => {
//     return respuesta.filter(
//       (attributes) => attributes.attributes.tipoPrenda === tipo
//     );
//   };

//   // Función para dividir las prendas en lotes de 3 para cada fila
//   const dividirPrendasPorFila = (prendas) => {
//     const filas = [];
//     for (let i = 0; i < prendas.length; i += 3) {
//       filas.push(prendas.slice(i, i + 3));
//     }
//     return filas;
//   };

//   return (
//     <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollViewContent}
//       >
//         {console.log(selectedPrendas)}
//         {tiposPrenda.map((tipo, index) => (
//           <View
//             key={index}
//             style={{
//               width: Dimensions.get("window").width,
//               paddingTop: 25,
//               flex: 1,
//             }}
//           >
//             <View style={styles.sliderContainer}>
//               <Text style={styles.sliderTitle}>{tipo.toUpperCase()}</Text>
//               <ScrollView showsVerticalScrollIndicator={false}>
//                 {dividirPrendasPorFila(filtrarPrendasPorTipo(tipo)).map(
//                   (fila, filaIndex) => (
//                     <View key={filaIndex} style={styles.rowContainer}>
//                       {fila.map((attributes) => (
//                         <TouchableOpacity
//                           key={attributes.id}
//                           style={[
//                             styles.cardTouchable,
//                             selectedPrendas.includes(attributes.id) &&
//                               styles.selectedCard,
//                           ]}
//                           onPress={() => handleSelectCard(attributes.id)}
//                         >
//                           <Card
//                             prenda={attributes}
//                             selected={selectedPrendas.includes(attributes.id)}
//                           />
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   )
//                 )}
//               </ScrollView>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Botón "Siguiente" */}
//       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//         <Text style={styles.buttonText}>Siguiente</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sliderContainer: {
//     flex: 1,
//     padding: 10,
//   },
//   scrollViewContent: {
//     alignItems: "center",
//     zIndex: 10,
//   },
//   sliderTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "white", // Ajustamos el color del texto
//   },
//   cardTouchable: {
//     // width: (Dimensions.get("window").width - 40) / 3, // Calcula el ancho de cada tarjeta (restando los márgenes)
//     // // marginBottom: 10, // Agrega un margen inferior para separar las filas
//     // // marginRight: 10, // Agrega un margen derecho para separar las tarjetas
//   },
//   selectedCard: {
//     opacity: 0.5, // Hace la tarjeta translúcida cuando está seleccionada
//     borderWidth: 2,
//     borderColor: "orange",
//     borderRadius: 5,
//   },
//   rowContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between", // Alinea las tarjetas al espacio entre sí
//     marginBottom: 10, // Agrega un margen inferior para separar las filas
//   },
//   nextButton: {
//     backgroundColor: "#800080",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     margin: 10,
//     alignSelf: "center",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     zIndex: 1,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default SeleccionPrendas;
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import GlobalApi from "../services/GlobalApi";

const categories = ["Cabeza", "Torso", "Piernas", "Pies"];

const screenWidth = Dimensions.get("window").width;
const numColumns = 3;
const itemWidth = (screenWidth - 40) / numColumns;

const SelectionScreen = ({
  category,
  navigation,
  items,
  selectedItems,
  toggleSelection,
}) => {
  const nextCategory = () => {
    const currentIndex = categories.indexOf(category);
    const nextIndex = (currentIndex + 1) % categories.length;
    navigation.navigate(categories[nextIndex]);
  };

  useEffect(() => {
    console.log("Selected IDs: ", selectedItems);
  }, [selectedItems]);

  return (
    <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={items[category]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedItems.includes(item.id) && styles.selectedItem,
            ]}
            onPress={() => toggleSelection(item)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
          </TouchableOpacity>
        )}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={() => (
          <View style={styles.emptyItem}>
            <Text style={styles.emptyText}>No items available</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={nextCategory}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const Tab = createMaterialTopTabNavigator();

const SeleccionPrendas = ({ tipo, respuesta }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const scrollViewRef = useRef(null);

  const toggleSelection = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item.id)
        ? prevSelectedItems.filter((id) => id !== item.id)
        : [...prevSelectedItems, item.id]
    );
  };

  const items = categories.reduce((acc, category) => {
    acc[category] = respuesta
      .filter(
        (attributes) =>
          attributes.attributes.tipoPrenda.toLowerCase() ===
          category.toLowerCase()
      )
      .map((attributes) => ({
        id: attributes.id,
        name: attributes.attributes.nombre,
        image: GlobalApi.getImg(attributes),
      }));
    return acc;
  }, {});

  return (
    <Tab.Navigator style={{ marginTop: 40 }}>
      {categories.map((category) => (
        <Tab.Screen key={category} name={category}>
          {(props) => (
            <SelectionScreen
              {...props}
              category={category}
              items={items}
              selectedItems={selectedItems}
              toggleSelection={toggleSelection}
            />
          )}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    marginTop: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: itemWidth,
    height: itemWidth,
  },
  emptyItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: itemWidth,
    height: itemWidth,
  },
  selectedItem: {
    backgroundColor: "#b0d4ff",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#800080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 10,
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    color: "gray",
  },
});

export default SeleccionPrendas;
