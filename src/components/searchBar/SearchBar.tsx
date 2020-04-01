import React from "react";
import { View } from "react-native";
import { searchStyles } from "./styles/searchStyles";

type SearchBarProps = {};

const SearchBar: React.FC<SearchBarProps> = () => {
  const styles = searchStyles;
  return <View style={styles.searchContainer} />;
};

export default SearchBar;
