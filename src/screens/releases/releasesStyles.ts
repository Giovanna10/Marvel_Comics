import { StyleSheet } from "react-native";
import { screenDimensions, size } from "../../utils/themes/sizes";
import { color } from "../../utils/themes/colors";

export const releasesStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: screenDimensions.height / 10
  },
  title: { color: color.white, fontSize: size.hero },
  background: {
    justifyContent: "center",
    alignItems: "center",
    width: screenDimensions.width,
    height: screenDimensions.height
  }
});
