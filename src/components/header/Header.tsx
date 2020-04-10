import React from "react";
import { connect } from "react-redux";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import hamburger from "../../assets/header/hamburger.png";
import marvel_Logo from "../../assets/marvel_Logo.png";
import search from "../../assets/header/search.png";
import { headerStyles } from "./styles/headerStyles";
import SearchBar from "../searchBar/SearchBar";
import {
  openSearchBoxAction,
  closeSearchBoxAction,
} from "../../store/actions/searchBoxActions/searchBoxActions";

type HeaderProps = {
  research?: boolean;
  openSearchBox: typeof openSearchBoxAction;
  closeSearchBox: typeof closeSearchBoxAction;
  searchBox: boolean;
};

const Header: React.FC<HeaderProps> = ({
  research,
  openSearchBox,
  closeSearchBox,
  searchBox,
}) => {
  const styles = headerStyles;

  const openSearchBoxInput = () => {
    if (searchBox === false) {
      openSearchBox();
    } else {
      closeSearchBox();
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
          <Image source={hamburger} />
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.shadow}>
            <Image source={marvel_Logo} style={styles.logo} />
          </View>
        </View>
        {research && (
          <TouchableOpacity
            onPress={openSearchBoxInput}
            style={styles.iconContainer}
          >
            <Image source={search} />
          </TouchableOpacity>
        )}
      </SafeAreaView>
      {research && (
        <View style={styles.searchBoxInputContainer}>
          <SearchBar />
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  searchBox: state.searchBox.searchBoxState,
});

const mapDispatchToProps = (dispatch) => ({
  openSearchBox: () => dispatch(openSearchBoxAction()),
  closeSearchBox: () => dispatch(closeSearchBoxAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
