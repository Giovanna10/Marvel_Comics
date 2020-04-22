import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const charactersStyles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    height: hp("90%"),
    resizeMode: "cover"
  },
  charactersList: {
    paddingTop: hp("4%"),
  },
  characterContainer: {
    marginVertical: hp("3%"),
  },
  characterItem: {
    width: 150,
    height: 150,
    marginHorizontal: wp("5%"),
    borderRadius: 5,
  },
  characterName: {
    fontSize: 9,
    color: color.white,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: hp("1%"),
  },
});
