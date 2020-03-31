import { StyleSheet } from "react-native";
import { screenDimensions, size } from "../../utils/themes/sizes";
import { color } from "../../utils/themes/colors";

export const charStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: screenDimensions.width,
    height: screenDimensions.height
  },
  title: { color: color.white, fontSize: size.hero }
});
