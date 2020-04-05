import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextInput, Animated } from "react-native";
import { searchStyles } from "./styles/searchStyles";

type SearchBarProps = {
  searchBox: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchBox }) => {
  const styles = searchStyles;

  const [transitionStartOfSearchBoxInput] = useState(new Animated.Value(0));
  const [transitionEndOfSearchBoxInput] = useState(new Animated.Value(0));

  useEffect(() => {
    searchBox === true &&
      Animated.timing(transitionStartOfSearchBoxInput, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
  });

  useEffect(() => {
    searchBox === false &&
      Animated.timing(transitionEndOfSearchBoxInput, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
  });

  return (
    <Animated.View
      style={{
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
      <TextInput style={styles.searchBoxInput} />
    </Animated.View>
  );
};

const mapStateToProps = state => ({
  searchBox: state.searchBox.searchBoxState
});

export default connect(mapStateToProps, null)(SearchBar);
