import React, { useEffect, useState } from "react";
import { characterDetailStyles } from "./characterDetailStyles";
import { connect } from "react-redux";
import { AppState } from "../../../store/store";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getSingleCharacterAction } from "../../../store/actions/charactersActions/charactersActions";
import { NavigationStackProp } from "react-navigation-stack";
import Header from "../../../components/header/Header";
import {
  Character,
  Comic,
} from "../../../store/actions/actionsTypes/ActionsTypes";
import { getComicByIdAction } from "../../../store/actions/comicsActions/comicsActions";
import { color } from "../../../utils/themes/colors";

type CharacterDetailProps = {
  singleCharacter: Character;
  relatedComics: Comic[];
  navigation?: NavigationStackProp;
  getSingleCharacter: typeof getSingleCharacterAction;
  getSelectedComic: typeof getComicByIdAction;
};

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  getSingleCharacter,
  singleCharacter,
  getSelectedComic,
  relatedComics,
  navigation,
}) => {
  const styles = characterDetailStyles;

  const [characterState, setCharacterState] = useState(true);

  useEffect(() => {
    navigation.state.params.length > 0 &&
      getSingleCharacter(navigation.state.params);
  }, [getSingleCharacter]);

  const handleComicPress = (uri) => {
    const comicId = uri;
    const splittedId = comicId.split("/");
    getSelectedComic(splittedId[6], relatedComics, characterState);
    navigation.navigate("ComicDetails");
  };

  const renderComics = ({ item }) => (
    <TouchableOpacity onPress={() => handleComicPress(item.resourceURI)}>
      <View style={styles.comicContainer}>
        <Text style={styles.comicName}> {item.name} </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header />
      <View style={styles.characterDetailContainer}>
        <LinearGradient
          style={{ height: hp("100%"), width: wp("100%") }}
          colors={["#000000", "#ae0000"]}
          start={{ x: 1, y: 0.4 }}
          end={{ x: 1, y: 2 }}
        >
          <ScrollView bounces={false}>
            {singleCharacter.thumbnail.extension === "jpg" ? (
              <Image
                source={{
                  uri: `${singleCharacter.thumbnail.path}/landscape_xlarge.jpg`,
                }}
                style={styles.characterDetailImage}
              />
            ) : (
              <Image
                source={{ uri: `${singleCharacter.thumbnail.path}.gif` }}
                style={styles.characterDetailImage}
              />
            )}
            <FlatList
              data={singleCharacter.comics.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderComics}
              bounces={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-around" }}
              style={{ marginBottom: hp("24%") }}
              ListHeaderComponent={
                <Text style={styles.characterDetailName}>
                  {" "}
                  {singleCharacter.name}{" "}
                </Text>
              }
            />
          </ScrollView>
        </LinearGradient>
      </View>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  singleCharacter: state.singleCharacter.singleCharacter,
  relatedComics: state.comics.relatedComics,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleCharacter: (characterName) =>
    dispatch(getSingleCharacterAction(characterName)),
  getSelectedComic: (
    comicId: number,
    comics: Comic[],
    characterState: boolean
  ) => dispatch(getComicByIdAction(comicId, comics, characterState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);
