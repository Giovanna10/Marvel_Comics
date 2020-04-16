import { StyleSheet } from "react-native";
import { screenDimensions, size } from "../../../utils/themes/sizes";
import { color } from "../../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const listStyles = StyleSheet.create({
  newsContainer: {
    height: hp("35%"),
  },
  coverImage: {
    width: screenDimensions.width,
    padding: "2%",
  },
  title: {
    color: color.title,
    fontSize: size.paragraph,
    fontWeight: "bold",
  },
  subtitle: {
    color: color.subtitle,
    fontSize: size.paragraph,
  },
  body: {
    color: color.subtitle,
    fontSize: size.body,
  },
  indicator: {
    backgroundColor: color.yellow,
    height: 5,
    borderRadius: 16,
  },
});
