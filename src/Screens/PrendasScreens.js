import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import prendas from "../prendas.json"; // Asegúrate de que la ruta sea correcta
import Card from "../components/Card";

const PrendasScreen = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  // Función para manejar el cambio de slider
  const handleNextSlider = () => {
    setCurrentSlider((prevSlider) => prevSlider + 1); // Actualiza el estado usando una función de callback
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

  // Función para filtrar las prendas por tipo y slider actual
  const filtrarPrendasPorTipoYSlider = (tipo) => {
    const prendasPorTipo = prendas.filter((prenda) => prenda.tipo === tipo);
    return prendasPorTipo.slice(currentSlider * 5, (currentSlider + 1) * 5);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderTitle}>Cabeza</Text>
          {filtrarPrendasPorTipoYSlider("cabeza").map((prenda, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cardTouchable,
                selectedCards.includes(index) ? styles.selectedCard : null,
              ]}
              onPress={() => handleSelectCard(index)}
            >
              <Card prenda={prenda} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextSlider}
          disabled={
            (currentSlider + 1) * 5 >=
            prendas.filter((prenda) => prenda.tipo === "cabeza").length
          }
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sliderContainer: {
    marginBottom: 20,
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
    marginTop: 20,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrendasScreen;
