import React from "react";
import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import releasesBg from "../../assets/screensBgs/releasesBg.png";
import { releasesStyles } from "./releasesStyles";

type ReleasesProps = {};

const Releases: React.FC<ReleasesProps> = () => {
  const styles = releasesStyles;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>News</Text>
      </View>
      <ImageBackground
        source={releasesBg}
        imageStyle={{ resizeMode: "contain" }}
        style={styles.background}
      >
        <Text style={styles.title}>Comics Flatlist</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Releases;
