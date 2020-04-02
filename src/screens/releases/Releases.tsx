import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, ImageBackground, FlatList, Image } from "react-native";
import releasesBg from "../../assets/screensBgs/releasesBg.png";
import { releasesStyles } from "./releasesStyles";
import Header from "../../components/header/Header";
import { db } from "../../../App";
import { getYearlyComicsAction } from "../../store/actions/comicsActions/comicsActions";
import { TouchableOpacity } from "react-native-gesture-handler";

type ReleasesProps = {
  yearlyComics: [];
  getYearlyComics: typeof getYearlyComicsAction;
};

const Releases: React.FC<ReleasesProps> = ({
  yearlyComics,
  getYearlyComics
}) => {
  const styles = releasesStyles;

  useEffect(() => {
    getYearlyComics();
  });



  const addToWishes = (title, comic) => {
    try {
      db.collection("Cart")
        .doc(title)
        .set(comic);
    } catch (error) {
      console.log(error.message);
    }
  };

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
        data={yearlyComics}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addToWishes(item.title, item)}>
            <Image
              source={{ uri: `${item.thumbnail.path}/portrait_uncanny.jpg` }}
              style={{ width: 200, height: 300 }}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const mapStateToProps = state => ({
  yearlyComics: state.comics.comicsArray
});

const mapDispatchToProps = dispatch => ({
  getYearlyComics: () => dispatch(getYearlyComicsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Releases);
