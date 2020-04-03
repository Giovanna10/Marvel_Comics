import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, ImageBackground, FlatList, Image } from "react-native";
import releasesBg from "../../assets/screensBgs/releasesBg.png";
import { releasesStyles } from "./releasesStyles";
import Header from "../../components/header/Header";
import { db } from "../../../App";
import { getYearlyComicsAction } from "../../store/actions/comicsActions/comicsActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppState } from "../../store/store";
import { Comic } from "../../store/actions/actionsTypes/ActionsTypes";
import Loading from "../../components/loading/Loading";

type ReleasesProps = {
  yearlyComics: Comic[];
  getYearlyComics: typeof getYearlyComicsAction;
};

const Releases: React.FC<ReleasesProps> = ({
  getYearlyComics,
  yearlyComics
}) => {
  const styles = releasesStyles;

  useEffect(() => {
    yearlyComics.length === 0 && getYearlyComics();
  }, []);

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
      {yearlyComics.length < 0 ? (
        <Loading />
      ) : (
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
            horizontal
            data={yearlyComics}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItemContainer} onPress={() => console.log(item)}>
                <Image
                  source={{
                    uri: `${item.thumbnail.path}/portrait_xlarge.jpg`
                  }}
                  style={{ width: 150, height: 225 }}
                />
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  yearlyComics: state.comics.yearlyComics
});

const mapDispatchToProps = dispatch => ({
  getYearlyComics: () => dispatch(getYearlyComicsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Releases);
