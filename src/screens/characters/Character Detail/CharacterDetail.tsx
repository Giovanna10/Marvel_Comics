import React from "react";
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
import { NavigationStackProp } from "react-navigation-stack";
import Header from "../../../components/header/Header";
import {
  Character,
  Comic,
} from "../../../store/actions/actionsTypes/ActionsTypes";
import { getComicByIdAction } from "../../../store/actions/comicsActions/comicsActions";
import { setFromCharacterAction } from "../../../store/actions/charactersActions/charactersActions";

type CharacterDetailProps = {
  navigation?: NavigationStackProp;
  singleCharacter: Character;
  getSelectedComic: typeof getComicByIdAction;
  setFromCharacter: typeof setFromCharacterAction;
};

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  navigation,
  singleCharacter,
  getSelectedComic,
  setFromCharacter,
}) => {
  const styles = characterDetailStyles;

  const extension =
    singleCharacter.thumbnail.extension === "jpg"
      ? "/landscape_xlarge.jpg"
      : ".gif";

  const handleComicPress = (comicId: string) => {
    setFromCharacter()
    getSelectedComic(comicId, true, []);
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
      <Text style={styles.comicName}> {item.title} </Text>
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
          keyExtractor={(item) => `Key-${item.id}`}
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
  singleCharacter: state.characters.singleCharacter,
});

const mapDispatchToProps = (dispatch) => ({
  getSelectedComic: (
    comicId: string,
    characterState: boolean,
    array: Comic[]
  ) => dispatch(getComicByIdAction(comicId, characterState, array)),
  setFromCharacter: () => dispatch(setFromCharacterAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);
