import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const characterDetailStyles = StyleSheet.create({
  characterDetailContainer: {
    alignItems: 'center',
  },
  characterDetailImage: {
    width: wp('100%'),
    height: hp('30%'),
    alignSelf: 'center',
    opacity: 0.30,
  },
  characterDetailName: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: color.yellow,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: hp('3%'),
    textShadowColor: color.red,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  comicContainer: {
    height: 200,
    width: 140,
    backgroundColor: color.black,
    borderWidth: 1,
    borderColor: color.red,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: wp('3%'),
    marginVertical: hp('3%')
  },
  comicName: {
    textAlign: 'center',
    fontSize: 13,
    color: color.yellow,
  }
})