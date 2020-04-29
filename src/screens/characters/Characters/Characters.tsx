import React, { useEffect, useState } from "react";
import { charactersStyles } from "./charactersStyles";
import { connect } from "react-redux";
import { AppState } from "../../../store/store";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import charactersBg from "../../../assets/screensBgs/charactersBg.png";
import Header from "../../../components/header/Header";
import { getAllCharactersAction, getSingleCharacterAction } from "../../../store/actions/charactersActions/charactersActions";
import { Character } from "../../../store/actions/actionsTypes/ActionsTypes";
import { color } from "../../../utils/themes/colors";
import { NavigationStackProp } from "react-navigation-stack";
import { TouchableOpacity } from "react-native-gesture-handler";

type CharactersProps = {
  allCharacters: Character[];
  navigation?: NavigationStackProp;
  getAllCharacters: typeof getAllCharactersAction;
  getSingleCharacter: typeof getSingleCharacterAction;
};

const Characters: React.FC<CharactersProps> = ({
  navigation,
  allCharacters,
  getAllCharacters,
  getSingleCharacter,
}) => {
  const styles = charactersStyles;

  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    allCharacters.length === 0 && getAllCharacters();
  }, []);

  const handleLoadNextPage = () => {
    if (!loading) {
      getAllCharacters(offset);
      setLoading(true);
    }
    setOffset(offset + 8);
  };

  const goToCharacterDetail = (characterName: string) => {
    getSingleCharacter(characterName)
    navigation.navigate("CharacterDetail");
  };

  const renderCharacters = ({ item }) => (
    <TouchableOpacity onPress={() => goToCharacterDetail(item.name)}>
      <View style={styles.characterContainer}>
        <Image
          source={{
            uri: `${item.thumbnail.path}${
              item.thumbnail.extension === "jpg"
                ? "/standard_fantastic.jpg"
                : ".gif"
            }`,
          }}
          style={styles.characterItem}
        />

        <Text style={styles.characterName}> {item.name} </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header research />
      <ImageBackground
        source={charactersBg}
        imageStyle={styles.imageStyle}
        style={styles.background}
      >
        <FlatList
          data={allCharacters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCharacters}
          bounces={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          style={styles.charactersList}
          onMomentumScrollBegin={() => setLoading(false)}
          onEndReached={handleLoadNextPage}
          onEndReachedThreshold={0.7}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                size="small"
                color={color.yellow}
                style={{ marginBottom: "8%" }}
              />
            )
          }
        />
      </ImageBackground>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  allCharacters: state.characters.allCharacters,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCharacters: (offset: number) => dispatch(getAllCharactersAction(offset)),
  getSingleCharacter: (characterName: string) =>
    dispatch(getSingleCharacterAction(characterName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Characters);
