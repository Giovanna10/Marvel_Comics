import { StyleSheet } from "react-native";
import { screenDimensions, size } from "../../utils/themes/sizes";
import { color } from "../../utils/themes/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

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
    zIndex: 1
  },
  listItemContainer: {
    marginVertical: hp('10%'),
    marginHorizontal: wp('2%')
  }
});
