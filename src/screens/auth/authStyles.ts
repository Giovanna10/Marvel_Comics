import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { color } from "../../utils/themes/colors";
import { size, screenDimensions } from "../../utils/themes/sizes";

const loginStyle = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#1c1c1c"
  },
  imageBackground: {
    width: screenDimensions.width,
    height: screenDimensions.height
  },
  logoContainer: {
    alignItems: "center",
    marginTop: hp("4%"), //CHANGED
    marginBottom: hp("1%")
  },
  logo: { width: 114, height: 86 },
  error: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    marginTop: hp("1.5%"),
    marginBottom: hp("1%"),
    height: hp("5%")
  },
  errorMessage: {
    color: color.red,
    fontWeight: "bold",
    fontSize: size.errorMex,
    textAlign: "center"
  },
  inputTitle: {
    fontSize: size.titleTextField,
    textTransform: "uppercase",
    color: color.title,
    marginHorizontal: wp("10%"),
    paddingTop: hp("2.5%")
  },
  input: {
    borderBottomColor: color.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: hp("8%"),
    fontSize: size.input,
    color: color.white,
    marginHorizontal: wp("10%")
  },
  loginBtnsContainer: { marginTop: hp("7%") },//CHANGED
  loginBtnContainer: {
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("4%")
  },
  signupBtnContainer: {
    marginTop: hp('12%'),
    marginBottom: hp('5%'),
    alignItems: "center"
  },
  warningContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginTop: hp("1%")
  },
  warning: { color: color.white, fontSize: size.description },
  link: {
    color: color.red,
    fontSize: size.warning,
    fontWeight: "bold"
  }
});

export default loginStyle;
