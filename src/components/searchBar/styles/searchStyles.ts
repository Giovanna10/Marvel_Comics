import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const searchStyles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    height: hp('6%'),
    width: wp('85%'),
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: color.black,
    borderColor: color.yellow,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: hp('11.5%'),
    zIndex: 1
  }
});
