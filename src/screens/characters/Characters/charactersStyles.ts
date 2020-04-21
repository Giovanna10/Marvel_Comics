import { StyleSheet } from "react-native";
import { screenDimensions } from "../../../utils/themes/sizes";
import { color } from "../../../utils/themes/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const charactersStyles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
    width: screenDimensions.width,
    height: hp('90%'),
  },
  charactersList: {
    marginTop: hp('4%')
  },
  characterContainer: {
    flexDirection: 'column',
    marginVertical: hp('2%')
  },
  characterItem: {
    width: 150,
    height: 150,
    marginHorizontal: wp('2%'),
    borderRadius: 5,
  },
  characterName: {
    fontSize: 9,
    color: color.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('1%')
  },
});
