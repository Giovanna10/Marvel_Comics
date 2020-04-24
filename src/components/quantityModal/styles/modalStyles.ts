import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import { screenDimensions, size } from "../../../utils/themes/sizes";

const modalStyles = StyleSheet.create({
  modalExpandedContainer: {
    backgroundColor: color.white,
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    height: screenDimensions.height,
  },
  modalContainer: {
    backgroundColor: color.white,
    position: "absolute",
    top: screenDimensions.height - 315,
    height: 320,
  },
  headerListContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: color.red,
    borderBottomWidth: 0.5,
    borderBottomColor: "#c7c7c7",
  },
  headerTitleContainer: {
    paddingLeft: "10%",
    alignItems: "center",
  },
  headerTitleList: { fontSize: size.titleDetails, color: color.white },
  headerBackContainer: {
    width: "10%",
  },
  headerBackList: { fontSize: size.titleDetails, color: color.white },
  listItemContainer: {
    paddingVertical: 20,
  },
  listItem: {
    fontSize: size.input,
    alignSelf: "center",
  },
});

export default modalStyles;
