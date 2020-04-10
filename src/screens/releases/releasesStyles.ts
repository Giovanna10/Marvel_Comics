import { StyleSheet } from "react-native";
import { screenDimensions, size } from "../../utils/themes/sizes";
import { color } from "../../utils/themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export const releasesStyles = StyleSheet.create({
  //BG COMICS
  flatlistCover: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0
  },
  imageStyle: {
    resizeMode: "contain",
    width: screenDimensions.width,
    height: screenDimensions.height < 670 ? 350 : 410
  },
  //COMICS FLATLIST
  comicContainer: {
    width: screenDimensions.height < 670 ? 120 : 150,
    marginVertical: hp("4%"),
  },
  comic: {
    width: screenDimensions.height < 670 ? 120 : 150,
    height: screenDimensions.height < 670 ? 180 : 225,
    borderColor: color.subtitle,
    borderWidth: 0.7,
    marginBottom: '5%'
  },
  comicTitle: {
    color: color.title,
    fontSize: size.comicTitle,
    fontWeight: 'bold',
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
