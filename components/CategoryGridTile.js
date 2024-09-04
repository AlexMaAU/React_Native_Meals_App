import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CategoryGridTile({ category, onPress }) {
  // 子组件中也可以通过useNavigation钩子来获取navigation函数，这样就不需要传递navigation作为props
  const navigation = useNavigation();

  return (
    <View style={[styles.gridItem, { backgroundColor: category.color }]}>
      {/* 安卓要加点击波纹效果只需要设置android_ripple
        IOS需要自行添加样式，需要使用styles数组，设置pressed为true以后要加上什么样式 */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{category.title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    // 安卓的阴影效果
    elevation: 5,
    // IOS的阴影效果
    shadowColor: "black",
    shadowOffset: { with: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // 防止ripple effect超出容器 - 仅限安卓系统，IOS系统如果hidden会导致阴影不可见
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

