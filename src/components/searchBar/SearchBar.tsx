import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextInput, Animated, Platform } from "react-native";
import { searchStyles } from "./styles/searchStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppState } from "../../store/store";

type SearchBarProps = {
  searchBox: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchBox }) => {
  const styles = searchStyles;

  const [transitionStartOfSearchBoxInput] = useState(new Animated.Value(0));
  const [transitionEndOfSearchBoxInput] = useState(new Animated.Value(0));

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

  return (
    <Animated.View
      style={[
        Platform.OS === "ios" && { marginTop: hp("2%")},
        {
          transform: [
            {
              translateX:
                searchBox === true
                  ? transitionStartOfSearchBoxInput.interpolate({
                      inputRange: [1, 2],
                      outputRange: [0, 450],
                    })
                  : transitionEndOfSearchBoxInput.interpolate({
                      inputRange: [1, 2],
                      outputRange: [450, 900],
                    }),
            },
          ],
        },
      ]}
    >
      <TextInput style={styles.searchBoxInput} />
    </Animated.View>
  );
};

const mapStateToProps = (state: AppState) => ({
  searchBox: state.searchBox.searchBoxState,
});

export default connect(mapStateToProps, null)(SearchBar);
