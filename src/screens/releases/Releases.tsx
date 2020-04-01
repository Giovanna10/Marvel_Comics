import React from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList
} from "react-native";
import releasesBg from "../../assets/screensBgs/releasesBg.png";
import { releasesStyles } from "./releasesStyles";
import Header from "../../components/header/Header";

type ReleasesProps = {};

const Releases: React.FC<ReleasesProps> = () => {
  const styles = releasesStyles;

  const listItems = [
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item",
    "item"
  ];

  return (
    <>
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>News</Text>
      </View>
      <ImageBackground
        source={releasesBg}
        imageStyle={styles.imageStyle}
        style={styles.background}
      />
      <FlatList
        style={styles.listContainer}
        data={listItems}
        renderItem={({ item }) => (
          <Text style={styles.title}>{item}</Text>
        )}
      />
    </>
  );
};

export default Releases;
