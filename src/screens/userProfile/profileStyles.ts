import { StyleSheet } from "react-native";
import { color } from "../../utils/themes/colors";
import { size } from "../../utils/themes/sizes";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const profileStyles = StyleSheet.create({
  //USER INFO
  userContainer: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "5%",
    alignItems: "center",
    paddingTop: "15%",
  },
  userImageContainer: { width: "20%" },
  userImage: { width: 60, height: 60, borderRadius: 50 },
  userNameContainer: { width: "80%" },
  userName: { color: color.title, fontSize: size.subtitle },
  //LISTS
  listTitleContainer: {
    paddingVertical: "1%",
    backgroundColor: "#bdbdbd1c",
    marginBottom: "4%",
  },
  listTitle: {
    color: color.yellow,
    fontSize: size.paragraph,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginRight: "4%",
  },
  //LIST ITEMS
  comic_separator_container: {
    display: "flex",
    flexDirection: "row",
  },
  comicListContainer: {
    marginHorizontal: 20,
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
  //SEPARATORS
  verticalSeparatorCart: {
    height: 200,
    borderWidth: 0.3,
    borderColor: color.white,
    borderRadius: 5,
    opacity: 0.4,
    marginTop: "5%",
  },
  verticalSeparatorWhish: {
    height: 220,
    borderWidth: 0.3,
    borderColor: color.white,
    borderRadius: 5,
    opacity: 0.4,
    marginTop: "10%",
  },
  horizontalSeparator: {
    marginVertical: "10%",
    width: 140,
    borderWidth: 0.3,
    borderColor: color.white,
    borderRadius: 5,
    opacity: 0.4,
  },
});

export default profileStyles;
