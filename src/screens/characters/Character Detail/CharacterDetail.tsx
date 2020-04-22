import React, { useEffect } from "react";
import { characterDetailStyles } from "./characterDetailStyles";
import { connect } from "react-redux";
import { AppState } from "../../../store/store";
import {
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getSingleCharacterAction } from "../../../store/actions/charactersActions/charactersActions";
import { NavigationStackProp } from "react-navigation-stack";
import Header from "../../../components/header/Header";
import {
  Character,
  Comic,
} from "../../../store/actions/actionsTypes/ActionsTypes";
import { getComicByIdAction } from "../../../store/actions/comicsActions/comicsActions";

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
  navigation,
}) => {
  const styles = characterDetailStyles;

  const characterState = true;

  const extension =
    singleCharacter.thumbnail.extension === "jpg"
      ? "/landscape_xlarge.jpg"
      : ".gif";

  useEffect(() => {
    getSingleCharacter(navigation.state.params);
  }, [navigation.state.params]);

  const handleComicPress = (comicId: string) => {
    getSelectedComic(comicId, singleCharacter.comics.items, characterState);
    navigation.navigate("ComicDetails");
  };

  const renderHeader = () => (
    <ImageBackground
      source={{
        uri: `${singleCharacter.thumbnail.path}${extension}`,
      }}
      imageStyle={{ opacity: 0.3 }}
      style={styles.characterDetailImage}
    >
      <Text style={styles.characterDetailName}> {singleCharacter.name} </Text>
    </ImageBackground>
  );

  const renderComics = ({ item }) => (
    <TouchableOpacity
      style={styles.comicContainer}
      onPress={() => handleComicPress(item.id)}
    >
      <Text style={styles.comicName}> {item.name} </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Header />
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#000000", "#ae0000"]}
        start={{ x: 1, y: 0.4 }}
        end={{ x: 1, y: 2 }}
      >
        <FlatList
          data={singleCharacter.comics.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderComics}
          bounces={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          ListHeaderComponent={renderHeader}
        />
      </LinearGradient>
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
