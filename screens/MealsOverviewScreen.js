import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useNavigation } from "@react-navigation/native";

import { useLayoutEffect } from "react";
import MealList from "../components/MealList/MealList";

// 每个Screen组件除了自动接收navigation prop之外，还可以自动接收route prop，route prop提供了当前路由的信息和参数
// 和navigate一样，route也可以通过useRoute钩子来获得
export default function MealsOverviewScreen({ route }) {
  // 子组件中也可以通过useNavigation钩子来获取navigation函数，这样就不需要传递navigation作为props
  const navigation = useNavigation();

  // 从route prop里获得路由动态参数
  const categoryId = route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId)
  );

  // navigation.setOptions: 用于设置或更新当前屏幕的导航选项（例如标题、头部样式）
  // navigation对应App.js中的Stack.Screen，所以navigation.setOptions就等于添加<Stack.Screen options={} />
  // useLayoutEffect 应该用于那些需要确保 DOM 更新之后立即执行副作用的情况，特别是需要同步读取布局信息或操作 DOM 的情况
  // useEffect是组件更新后再执行effect，那么页面跳转后title会出现一瞬间的切换
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    // 设置navigation中要传入的参数，然后就可以通过route.params.categoryTitle获取
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  return <MealList displayedMeals={displayedMeals} />;
}

