import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const loginStyle = StyleSheet.create({
  logo: {
    alignItems: "center",
    marginTop: hp("4.75%"),
    marginBottom: hp('1%')
  },
  errorMessage: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    marginTop: hp('1.5%'),
    marginBottom: hp('3%'),
    height: hp('5%')
  },
  error: {
    color: "#ff0000",
    fontWeight: 'bold',
    fontSize: wp("3.75%"),
    textAlign: "center"
  },
  inputTitle: {
    fontSize: wp("2.75%"),
    textTransform: "uppercase",
    color: "#fefefe",
    marginHorizontal: "10%",
  },
  input: {
    borderBottomColor: "#fefefe",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: hp("8%"),
    fontSize: wp("4.5%"),
    color: "#fefefe",
    marginHorizontal: "10%"
  }
});

export default loginStyle;
