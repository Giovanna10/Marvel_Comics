import { StyleSheet } from "react-native";
import { color } from "../../utils/themes/colors";
import { size } from "../../utils/themes/sizes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const profileStyles = StyleSheet.create({
  container: { alignItems: "center" },
  title: { color: color.white, fontSize: size.hero },
  btnContainer: {
    width: wp("30%"),
    height: hp("5%"),
    borderWidth: 2,
    borderColor: "#fff300",
    backgroundColor: "#fff300",
    justifyContent: "center",
  }
});

export default profileStyles;
