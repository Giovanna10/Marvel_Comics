import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const headerStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: color.red,
    height: hp("15%"),
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
      width: 0,
      height: 5
    },
    shadowOpacity: 0.6,
    shadowRadius: 16.0
  },
  logo: {
    width: 65,
    height: 50
  }
});
