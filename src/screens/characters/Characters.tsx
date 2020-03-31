import React from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView
} from "react-native";
import charactersBg from "../../assets/screensBgs/charactersBg.png";
import { charStyles } from "./charactersStyles";

type CharactersProps = {};

const Characters: React.FC<CharactersProps> = () => {
  const styles = charStyles
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={charactersBg}
        imageStyle={{ resizeMode: "cover" }}
        style={styles.background}
      >
        <Text style={styles.title}>
          Characters Flatlist
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Characters;
