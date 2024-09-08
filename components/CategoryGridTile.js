import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ItalianImage from "../assets/images/Italian.png";
import QuickImage from "../assets/images/quick.png";
import BurgerImage from "../assets/images/burger.png";
import GermanImage from "../assets/images/German.png";
import LightImage from "../assets/images/light.png";
import ExoticImage from "../assets/images/Exotic.png";
import BreakfastImage from "../assets/images/Breakfast.png";
import AsianImage from "../assets/images/Asian.png";
import FrenchImage from "../assets/images/French.png";
import SummerImage from "../assets/images/Summer.png";

const imageMap = {
  Italian: ItalianImage,
  "Quick & Easy": QuickImage,
  Hamburgers: BurgerImage,
  German: GermanImage,
  "Light & Lovely": LightImage,
  Exotic: ExoticImage,
  Breakfast: BreakfastImage,
  Asian: AsianImage,
  French: FrenchImage,
  Summer: SummerImage,
};

export default function CategoryGridTile({ category, onPress }) {
  console.log(category.image);
  const imageSource = imageMap[category.image];

  // 子组件中也可以通过useNavigation钩子来获取navigation函数，这样就不需要传递navigation作为props
  const navigation = useNavigation();

  return (
    <View style={[styles.gridItem]}>
      <ImageBackground source={imageSource} style={styles.backgroundImage}>
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
      </ImageBackground>
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
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  button: {
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

