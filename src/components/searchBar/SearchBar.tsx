import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextInput, Animated, Platform } from "react-native";
import { searchStyles } from "./styles/searchStyles";
import { AppState } from "../../store/store";
import { NavigationStackProp } from "react-navigation-stack";
import { withNavigation } from "react-navigation";

type SearchBarProps = {
  navigation?: NavigationStackProp,
  searchBox: boolean,
};

const SearchBar: React.FC<SearchBarProps> = ({ searchBox, navigation }) => {
  const styles = searchStyles;

  const [transitionStartOfSearchBoxInput] = useState(new Animated.Value(0));
  const [transitionEndOfSearchBoxInput] = useState(new Animated.Value(0));
  const [characterName, setCharacterName] = useState<string>("");

  useEffect(() => {
    searchBox
      ? Animated.timing(transitionStartOfSearchBoxInput, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
      : Animated.timing(transitionEndOfSearchBoxInput, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
  }, [searchBox]);

  const searchCharacterDetail = (characterName) => {
    navigation.navigate('CharacterDetail', characterName)
  }


  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        transform: [
          {
            translateX:
              searchBox === true
                ? transitionStartOfSearchBoxInput.interpolate({
                  inputRange: [1, 2],
                  outputRange: [0, 450]
                })
                : transitionEndOfSearchBoxInput.interpolate({
                  inputRange: [1, 2],
                  outputRange: [450, 900]
                })
          }
        ]
      }}
    >
      <TextInput
        style={styles.searchBoxInput}
        value={characterName}
        onChangeText={characterValue => setCharacterName(characterValue)}
        onSubmitEditing={() => searchCharacterDetail(characterName)}
      />
    </Animated.View>
  );
};

const mapStateToProps = (state: AppState) => ({
  searchBox: state.searchBox.searchBoxState,
});

export default connect(mapStateToProps, null)(withNavigation(SearchBar));
