import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import { screenDimensions } from "../../../utils/themes/sizes";

export const loadingStyles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: color.black,
    height: screenDimensions.height,
    alignItems: "center",
    justifyContent: "center"
  }
});
