import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MealItem from "./MealItem";

function MealList({ displayedMeals }) {
  const navigation = useNavigation();

  const renderMealItem = (itemData) => {
    function handlePress() {
      navigation.navigate("MealDetail", { mealId: itemData.item.id });
    }

    return <MealItem meal={itemData.item} onPress={handlePress} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={displayedMeals.id}
        renderItem={renderMealItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default MealList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

