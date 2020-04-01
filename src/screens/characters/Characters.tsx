import React from "react";
import { View, Text, ImageBackground } from "react-native";
import charactersBg from "../../assets/screensBgs/charactersBg.png";
import { charStyles } from "./charactersStyles";
import Header from "../../components/header/Header";

type CharactersProps = {};

const Characters: React.FC<CharactersProps> = () => {
  const styles = charStyles;
  return (
    <View style={{position: 'absolute'}}>
      <Header research/>
      <ImageBackground
        source={charactersBg}
        imageStyle={{ resizeMode: "cover" }}
        style={styles.background}
      >
        <Text style={styles.title}>Characters Flatlist</Text>
      </ImageBackground>
    </View>
  );
};

export default Characters;
