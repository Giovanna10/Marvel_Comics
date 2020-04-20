import React from "react";
import { connect } from "react-redux";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
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
import { AppState } from "../../store/store";
import { withNavigation } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";

type HeaderProps = {
  research?: boolean;
  openSearchBox: typeof openSearchBoxAction;
  closeSearchBox: typeof closeSearchBoxAction;
  searchBox: boolean;
  navigation?: NavigationStackProp,
};

const Header: React.FC<HeaderProps> = ({
  research,
  openSearchBox,
  closeSearchBox,
  searchBox,
  navigation
}) => {
  const styles = headerStyles;

  const SearchBoxState = () => {
    if (searchBox === false) {
      openSearchBox();
    } else {
      closeSearchBox();
    }
  };

  const SideBarState = () => {
    navigation.toggleDrawer()
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={SideBarState}
          style={styles.iconContainer}>
          <Image source={hamburger} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <View style={styles.shadow}>
            <Image source={marvel_Logo} style={styles.logo} />
          </View>
        </View>
        {research && (
          <TouchableOpacity
            onPress={SearchBoxState}
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

const mapStateToProps = (state: AppState) => ({
  searchBox: state.searchBox.searchBoxState,
});

const mapDispatchToProps = (dispatch) => ({
  openSearchBox: () => dispatch(openSearchBoxAction()),
  closeSearchBox: () => dispatch(closeSearchBoxAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Header));
