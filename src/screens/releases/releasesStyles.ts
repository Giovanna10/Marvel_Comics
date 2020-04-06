import { StyleSheet } from "react-native";
import { screenDimensions, size } from "../../utils/themes/sizes";
import { color } from "../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export const releasesStyles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.black,
    height: hp("30%"),
    zIndex: 2
  },
  title: { color: color.white, fontSize: size.hero },
  background: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0
  },
  imageStyle: {
    resizeMode: "contain",
    width: screenDimensions.width,
    height: screenDimensions.height < 670 ? 330 : 400
  },
  listContainer: {
    alignSelf: "center"
  },
  comicsContainer: {
    width: 150,
    marginTop: hp("8%"),
    marginHorizontal: screenDimensions.width < 414 ? wp("4%") : wp("6%"),
  },
  comic: {
    width: 150,
    height: 225,
    borderColor: color.subtitle,
    borderWidth: 0.7,
    marginBottom: '5%'
  },
  comicTitle: {
    color: color.title,
    fontSize: size.comicTitle,
    fontWeight: "800",
  },
  comicSubtitle: {
    color: color.subtitle,
    fontSize: size.comicTitle
  },
  comicDate: {
    color: color.subtitle,
    fontSize: size.comicDetails
  }
});
