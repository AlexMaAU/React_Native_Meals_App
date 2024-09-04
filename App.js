import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FavoritesContextProvider from "./store/context/favoritesContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#351401",
        },
        headerTintColor: "white",
        sceneContainerStyle: {
          backgroundColor: "#3f2f25",
        },
        drawerContentStyle: {
          backgroundColor: "#351401",
        },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "white",
      }}
    >
      <Drawer.Screen
        name="MealsCategory"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerLabel: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerLabel: "My Favorites",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesContextProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        {/* React Native的路由导航写法 */}
        {/* 所有类型的路由都一定要包裹在 NavigationContainer 里 */}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MealsCategory"
            // screenOptions是用来设置全局的default settings
            screenOptions={{
              headerStyle: {
                backgroundColor: "#351401",
              },
              headerTintColor: "white",
              contentStyle: {
                backgroundColor: "#3f2f25",
              },
            }}
          >
            {/* Stack.Screen里的name会默认作为header标题，可以通过options对header部分进行定制 */}
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator} // Nested Router，把Drawer Navigator嵌套进Stack Navigator里面
              options={{
                headerShown: false, // 不显示这个Header
              }}
            />
            <Stack.Screen
              name="MealOverview"
              component={MealsOverviewScreen}
              // options里除了可以直接定义内置的参数，也可以写成回调函数，这样就可以实现动态设置options
              // Stack.Screen里默认能接收到route和navigation props，通过route.params可以获取navigation.navigate里传入的参数
              // 这样就可以动态设置title等options参数
              options={({ route, navigation }) => {
                const catTitle = route.params.categoryTitle;
                return {
                  title: catTitle,
                };
              }}
            />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </FavoritesContextProvider>
  );
}

const styles = StyleSheet.create({});

