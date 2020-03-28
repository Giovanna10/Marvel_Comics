import React from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Dimensions
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import releasesBg from "../../assets/screensBgs/releasesBg.png";

const { width, height } = Dimensions.get("screen");

type ReleasesProps = {};

const Releases: React.FC<ReleasesProps> = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: height/10
        }}
      >
        <Text style={{ color: "#fefefe", fontSize: wp("10%") }}>News</Text>
      </View>
      <ImageBackground
        source={releasesBg}
        imageStyle={{ resizeMode: "contain" }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: width,
          height: height
        }}
      >
        <Text style={{ color: "#fefefe", fontSize: wp("10%") }}>
          Comics Flatlist
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Releases;
