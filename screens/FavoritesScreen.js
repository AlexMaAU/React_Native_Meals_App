import { Text, View, StyleSheet } from "react-native";
import MealList from "../components/MealList/MealList";
import { useFavoritesContext } from "../store/context/favoritesContext";
import { MEALS } from "../data/dummy-data";

export default function FavoritesScreen() {
  const { ids } = useFavoritesContext();
  const displayedMeals = MEALS.filter((meal) => ids.includes(meal.id));

  if (displayedMeals.length === 0)
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet</Text>
      </View>
    );

  return <MealList displayedMeals={displayedMeals} />;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

