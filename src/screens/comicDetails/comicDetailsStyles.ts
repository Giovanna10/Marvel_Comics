import { StyleSheet } from "react-native";
import { screenDimensions, size } from "../../utils/themes/sizes";
import { color } from "../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const comicDetailsStyles = StyleSheet.create({
  //HEADING
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: wp("5%"),
    marginVertical: hp("6%"),
  },
  comicContainer: {
    width: "45%",
  },
  //LIST
  comicListContainer: {
    marginRight: 20
  },
  comic: {
    width: 120,
    height: 180,
    borderColor: color.subtitle,
    borderWidth: 0.7,
    marginBottom: 20,
  },
  comicDescriptionContainer: {
    width: 120,
    marginBottom: 40
  },
  titlesContainer: {
    width: "55%",
  },
  comicTitle: {
    color: color.title,
    fontSize: size.comicTitle,
    fontWeight: "bold",
  },
  comicSubtitle: {
    color: color.subtitle,
    fontSize: size.comicTitle,
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
    marginHorizontal: '5%'
  }
});
