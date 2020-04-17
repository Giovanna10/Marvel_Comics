import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export const searchStyles = StyleSheet.create({
  searchBoxInput: {
    height: hp("6%"),
    width: wp("75%"),
    justifyContent: "center",
    color: color.yellow,
    fontSize: 15,
    backgroundColor: color.black,
    borderColor: color.yellow,
    borderWidth: 1,
    borderRadius: 15
  }
});
