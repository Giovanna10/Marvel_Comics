import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  SafeAreaView
} from "react-native";
import charactersBg from "../../assets/screensBgs/charactersBg.png";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

type CharactersProps = {};

const Characters: React.FC<CharactersProps> = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={charactersBg}
        imageStyle={{ resizeMode: "cover" }}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: width,
          height: height
        }}
      >
        <Text style={{ color: "#fefefe", fontSize: wp("10%") }}>
          Characters Flatlist
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Characters;
