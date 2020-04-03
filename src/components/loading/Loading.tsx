import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { NavigationStackProp } from "react-navigation-stack";
import { loadingStyles } from "./loadingStyles";
import { color } from "../../utils/themes/colors";

type LoadingProps = {
  navigation?: NavigationStackProp;
};

const Loading: React.FC<LoadingProps> = ({ navigation }) => {
  const styles = loadingStyles;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? "App" : "Auth");
    });
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={color.yellow} size="large" />
    </View>
  );
};

export default Loading;
