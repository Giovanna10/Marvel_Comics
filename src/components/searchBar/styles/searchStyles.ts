import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export const searchStyles = StyleSheet.create({
  searchBoxInput: {
    height: 50,
    width: wp("85%"),
    justifyContent: "center",
    color: "#fefefe",
    fontSize: 18,
    backgroundColor: color.black,
    borderColor: color.yellow,
    borderWidth: 1,
    borderRadius: 15
  }
});
