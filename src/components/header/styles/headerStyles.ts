import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export const headerStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: color.red,
    height: hp("10%"),
    zIndex: 0
  },
  iconContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 16.0
  },
  logo: {
    width: 55,
    height: 40
  },
  searchBoxInputContainer: {
    position: "absolute",
    marginTop: hp("9%"),
    alignSelf: "center",
    zIndex: 1
  },
});
