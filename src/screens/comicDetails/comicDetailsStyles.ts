import { StyleSheet, Platform } from "react-native";
import { size, screenDimensions } from "../../utils/themes/sizes";
import { color } from "../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const comicDetailsStyles = StyleSheet.create({
  //BACKGROUND
  background: {
    width: "100%",
    flex: 1,
    height: 900,
  },

  //HEADING
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: wp("5%"),
    marginTop: hp("6%"),
    marginBottom: hp("3%"),
  },
  comicContainer: {
    width: "45%",
  },
  comicInHeading: {
    width: screenDimensions.height < 670 ? 120 : 150,
    height: screenDimensions.height < 670 ? 180 : 225,
    borderColor: color.subtitle,
    borderWidth: 0.7,
    marginBottom: 10,
  },

  comicListContainer: {
    marginRight: 20,
  },

  comic: {
    width: 120,
    height: 180,
    borderColor: color.subtitle,
    borderWidth: 0.7,
    marginBottom: 10,
  },
  comicDescriptionContainer: {
    width: 120,
  },
  titlesContainer: {
    width: "55%",
  },
  title: {
    color: color.title,
    fontSize: size.titleDetails,
    fontWeight: "bold",
  },
  comicTitle: {
    color: color.title,
    fontSize: size.comicTitle,
    fontWeight: "bold",
  },
  comicSubtitle: {
    color: color.subtitle,
    fontSize: size.comicDetails,
  },
  comicDetails: {
    color: color.subtitle,
    fontSize: size.comicDetails,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: "2%",
    paddingHorizontal: "5%",
    marginBottom: "5%",
    backgroundColor: color.yellow,
    width: 160,
    height: 35,
    borderColor: color.black,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  btnTextContainer: {
    width: "85%",
  },
  btnText: {
    fontSize: size.btnText,
    marginTop: "2%",
    fontStyle: "italic",
    fontWeight: "bold",
    color: color.black,
  },
  btnIconContainer: {
    width: "15%",
  },
  btnIcon: {
    width: 25,
    height: 25,
  },

  //DETAILS
  detailsContainer: {
    marginHorizontal: "5%",
  },
});
