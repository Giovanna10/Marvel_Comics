import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Dimensions } from "react-native";

export const screenDimensions = Dimensions.get('screen')

export const size = {
  hero: wp("10%"),
  title: wp("8%"),
  subtitle: wp("6%"),
  paragraph: wp("4%"),
  body:  wp("3%"),
  titleTextField: wp("2.75%"),
  input: wp("4.5%"),
  errorMex: wp("3.75%"),
  warning: wp("4.5%"),
  description: wp("3.75%"),
  titleDetails: screenDimensions.height < 670 ? wp("3.5%") : wp("5%"),
  btnText: screenDimensions.height < 670 ? wp("3%") : wp("3.5%"),
  comicTitle: wp("3.5%"),
  comicDetails: screenDimensions.height < 670 ? wp("3") : wp("3.5%")
};
