import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

import { MEALS } from "../data/dummy-data";

import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useFavoritesContext } from "../store/context/favoritesContext";

export default function MealDetailScreen() {
  const { ids, addFavorite, removeFavorite } = useFavoritesContext();

  const route = useRoute();
  const mealId = route.params.mealId;

  const navigation = useNavigation();

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = ids.includes(mealId);

  function handleChangeFavorites(mealId) {
    mealIsFavorite ? removeFavorite(mealId) : addFavorite(mealId);
  }

  useLayoutEffect(() => {
    // navigation对应App.js中的Stack.Screen，所以navigation.setOptions就等于添加<Stack.Screen options={} />
    navigation.setOptions({
      // 在Header中添加组件，比如按钮等
      // headerRight表示在右侧添加，headerLeft表示在左侧添加
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={() => handleChangeFavorites(mealId)}
          />
        );
      },
    });
  }, [navigation, handleChangeFavorites]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>

      <MealDetails meal={selectedMeal} textStyle={styles.detailText} />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List dataList={selectedMeal.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List dataList={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: { marginBottom: 32 },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});

