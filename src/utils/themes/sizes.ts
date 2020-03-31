import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Dimensions } from "react-native";

export const screenDimensions = Dimensions.get('screen')

export const size = {
  hero: wp("10%"),
  title: wp("8%"),
  subtitle: wp("6%"),
  paragraph: wp("4%"),
  titleTextField: wp("2.75%"),
  input: wp("4.5%"),
  errorMex: wp("3.75%"),
  warning: wp("4.5%"),
  description: wp("3.75%")
};
