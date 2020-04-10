import { StyleSheet, Platform } from "react-native";
import { color } from "../../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const headerStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: color.red,
    height: Platform.OS === "ios" ? hp("12%") : hp("8%"),
    zIndex: 0,
  },
  iconContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: '60%',
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    //for Android
    width: 53,
    height: 38,
    elevation: 3,
    borderColor: "transparent",
    //for IOS
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
  },
  logo: {
    width: 55,
    height: 40,
    resizeMode: "cover",
  },
  searchBoxInputContainer: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? hp("9%") : hp("7.25%"),
    alignSelf: "center",
    zIndex: 1,
  },
});
