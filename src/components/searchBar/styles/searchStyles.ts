import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const searchStyles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    height: 50,
    width: 350,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: color.black,
    borderColor: color.yellow,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: hp('14%'),
    zIndex: 1
  }
});
