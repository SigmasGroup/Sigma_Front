import GlobalApi from "../services/GlobalApi";
import DetalleRopa from "./detalleRopa";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function DetalleConjunto({ atributes, id, updateDetalle }) {
  const [ropa, setRopa] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState();
  const [favoriteId, setFavoriteID] = useState([]);

  useEffect(() => {
    setRopa(atributes.ropas.data);
  }, [atributes, ropa]);

  useEffect(() => {
    if (atributes.tipoConjunto === "admin") {
      getFavoriteId();
    }
  }, [ropa]);

  const getFavoriteId = () => {
    const favoriteIds = atributes.favorite.data.map((e) => {
      confirm();
      return e.id;
    });
    setFavoriteID(favoriteIds);
    console.log("lala", favoriteId);
  };

  const confirm = async () => {
    const storedUserId = await AsyncStorage.getItem("id");
    if (favoriteId.includes(parseInt(storedUserId))) {
      console.log("si", favoriteId);
      setIsBookmarked(true);
    } else {
      console.log("no", favoriteId);
      setIsBookmarked(false);
    }
  };

  const handleBookmarkPress = async () => {
    const storedUserId = await AsyncStorage.getItem("id");
    setIsBookmarked(!isBookmarked);

    if (!isBookmarked) {
      const newFavoriteId = [...favoriteId, parseInt(storedUserId)];
      setFavoriteID(newFavoriteId);
      await GlobalApi.putFavorite(id, newFavoriteId);
      console.log("guardado", newFavoriteId, "id", id);
    } else {
      const newFavoriteId = favoriteId.filter(
        (item) => item !== parseInt(storedUserId)
      );
      setFavoriteID(newFavoriteId);
      await GlobalApi.putFavorite(id, newFavoriteId);
      console.log("eliminado", newFavoriteId, "id", id);
      updateDetalle();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {atributes.tipoConjunto === "admin" ? (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{atributes.nombre}</Text>
            <TouchableOpacity
              onPress={handleBookmarkPress}
              style={styles.bookmarkButton}
            >
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={30}
                color="black"
              />
            </TouchableOpacity>
            <Text style={styles.description}>{atributes.descripcion}</Text>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{atributes.nombre}</Text>
            <Text style={styles.description}>{atributes.descripcion}</Text>
          </View>
        )}

        <View style={{ flex: 4, justifyContent: "center" }}>
          {ropa.map(({ attributes, id }) => (
            <DetalleRopa key={id} {...attributes} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    maxWidth: 380,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "column",
    flex: 2,
    maxHeight: 580,
  },
  contentContainer: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",

    maxWidth: 280,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "gray",
  },
  bookmarkButton: {
    position: "absolute",
    top: 15,
    right: -60,
    zIndex: 1,
  },
});
