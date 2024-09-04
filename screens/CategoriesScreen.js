import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

// 把组件包裹进React Native的路由导航以后，子组件会接收默认的navigation prop
export default function CategoriesScreen({ navigation }) {
  const renderCategoryItem = (itemData) => {
    function handlePress() {
      // navigation.navigate: 用于切换到另一个屏幕，并传递参数到目标屏幕
      // navigation.navigate传入2个参数，第一个是要跳转页面的name，第二个是要传入的参数
      navigation.navigate("MealOverview", {
        categoryId: itemData.item.id,
      });
    }

    return <CategoryGridTile category={itemData.item} onPress={handlePress} />;
  };

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2} // 设置FlatList为Grid布局，这里是2列
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}

