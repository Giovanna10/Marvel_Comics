import { StyleSheet } from "react-native";
import { color } from "../../utils/themes/colors";
import { size } from "../../utils/themes/sizes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const profileStyles = StyleSheet.create({
  container: { alignItems: "center" },
  title: { color: color.title, fontSize: size.subtitle },
  btnContainer: {
    width: wp("30%"),
    height: hp("5%"),
    borderWidth: 2,
    borderColor: "#fff300",
    backgroundColor: "#fff300",
    justifyContent: "center",
  },
  //USER INFO
  userContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "10%",
    paddingLeft: "5%",
    alignItems: "center",
  },
  userImageContainer: { width: "20%" },
  userImage: { width: 60, height: 60, borderRadius: 50 },
  userNameContainer: { width: "80%" },
  userName: { color: color.title, fontSize: size.subtitle },

  listTitle: {
    color: color.title,
    fontSize: size.paragraph,
    alignSelf: "flex-end",
  },
});

export default profileStyles;
