import React from "react";
import { View, SafeAreaView, Image } from "react-native";
import hamburger from "../../assets/header/hamburger.png";
import marvel_Logo from "../../assets/marvel_Logo.png";
import search from "../../assets/header/search.png";
import { headerStyles } from "./styles/headerStyles";
import SearchBar from "../searchBar/SearchBar";

type HeaderProps = {
  research?: boolean;
};

const Header: React.FC<HeaderProps> = ({ research }) => {
  const styles = headerStyles;
  return (
    <>
      <SafeAreaView
        style={styles.container}
      >
        <View style={styles.iconContainer}>
          <Image source={hamburger} />
        </View>
        <View style={styles.logoContainer}>
          <Image source={marvel_Logo} style={styles.logo} />
        </View>
        {research && (
          <View style={styles.iconContainer}>
            <Image source={search} />
          </View>
        )}
      </SafeAreaView>
      {research && <SearchBar />}
    </>
  );
};

export default Header;
