import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import { screenDimensions } from "../../../utils/themes/sizes";

const modalStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: color.white,
    top: screenDimensions.height - 200
  },
});

export default modalStyles;
