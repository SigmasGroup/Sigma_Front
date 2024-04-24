import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import prendas from "../prendas.json"; // Asegúrate de que la ruta sea correcta
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const PrendasScreen = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const tiposPrenda = ["cabeza", "torso", "piernas", "pies"];
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  // Función para manejar el movimiento al siguiente slider
  const handleNext = () => {
    if (currentPage < tiposPrenda.length - 1) {
      scrollViewRef.current.scrollTo({
        animated: true,
        x: (currentPage + 1) * Dimensions.get("window").width,
      });
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate("home");
    }
  };

  // Función para manejar el desplazamiento entre sliders
  const handleScroll = (event) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    setCurrentPage(slideIndex);
  };

  // Función para manejar la selección de tarjetas
  const handleSelectCard = (index) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(
        selectedCards.filter((cardIndex) => cardIndex !== index)
      );
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  // Función para filtrar las prendas por tipo
  const filtrarPrendasPorTipo = (tipo) => {
    return prendas.filter((prenda) => prenda.tipo === tipo);
  };

  // Función para dividir las prendas en lotes de 5 para cada slider
  const dividirPrendasPorSlider = (prendas) => {
    const sliders = [];
    for (let i = 0; i < prendas.length; i += 5) {
      sliders.push(prendas.slice(i, i + 5));
    }
    return sliders;
  };

  return (
    <LinearGradient colors={["#000", "#800080"]} style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {tiposPrenda.map((tipo, index) => (
          <View
            key={index}
            style={{
              width: Dimensions.get("window").width,
              paddingTop: 25,
              flex: 1,
            }}
          >
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderTitle}>{tipo.toUpperCase()}</Text>
              <ScrollView>
                {dividirPrendasPorSlider(filtrarPrendasPorTipo(tipo)).map(
                  (slider, sliderIndex) => (
                    <View key={sliderIndex}>
                      {slider.map((prenda, cardIndex) => (
                        <TouchableOpacity
                          key={cardIndex}
                          style={[
                            styles.cardTouchable,
                            selectedCards.includes(cardIndex)
                              ? styles.selectedCard
                              : null,
                          ]}
                          onPress={() => handleSelectCard(cardIndex)}
                        >
                          <Card prenda={prenda} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )
                )}
              </ScrollView>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botón "Siguiente" */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    flex: 1,
    padding: 10,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardTouchable: {
    marginBottom: 10,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "blue",
  },
  nextButton: {
    backgroundColor: "#800080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default PrendasScreen;
