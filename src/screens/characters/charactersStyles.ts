import { StyleSheet } from "react-native";
import { screenDimensions, size } from "../../utils/themes/sizes";
import { color } from "../../utils/themes/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const charStyles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
    width: screenDimensions.width,
    height: hp('80%'),
  },
  title: { color: color.white, fontSize: size.hero }
});
