import { StyleSheet } from "react-native";
import { color } from "../../utils/themes/colors";
import { size } from "../../utils/themes/sizes";

const profileStyles = StyleSheet.create({
  //USER INFO
  userContainer: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "5%",
    alignItems: "center",
  },
  userImageContainer: { width: "20%" },
  userImage: { width: 60, height: 60, borderRadius: 50 },
  userNameContainer: { width: "80%" },
  userName: { color: color.title, fontSize: size.subtitle },
  //LISTS
  cartListTitleContainer: {
    borderTopWidth: 0.2,
    borderTopColor: color.mattYellow,
    marginBottom: "4%",
  },
  cartTitleContainer: {
    width: 60,
    alignSelf: "flex-end",
    marginRight: "4%",
    backgroundColor: color.black,
    paddingVertical: "1%",
  },
  listTitleContainer: {
    borderTopWidth: 0.2,
    borderTopColor: color.mattYellow,
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
  comicContainerCart: {
    display: "flex",
    flexDirection: "row",
  },
  comicContainerWhish: {
    marginHorizontal: 20,
  },
  comic: {
    width: 120,
    height: 180,
    borderColor: color.subtitle,
    borderWidth: 0.7,
    marginBottom: 10,
  },
  comicDescriptionContainerCart: {
    width: 120,
    marginLeft: 20,
  },
  comicDescriptionContainerWhish: {
    width: 120,
  },
  comicTitle: {
    color: color.title,
    fontSize: size.comicTitle,
    fontWeight: "bold",
    // position: "absolute",
  },
  comicSubtitle: {
    color: color.subtitle,
    fontSize: size.comicDetails,
  },
  comicDetails: {
    color: color.subtitle,
    fontSize: size.comicDetails,
  },
  qntContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "10%",
    width: 60,
    height: 30,
    borderRadius: 6,
    backgroundColor: color.white,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    width: 120,
  },
  cartIconContainer: { width: "85%" },
  smallTrashIconContainer: { width: "15%" },
  trashIconContainer: {
    justifyContent: "center",
    marginLeft: 40,
  },
  icon: { width: 30, height: 30 },
  smallIcon: { width: 20, height: 20 },
  //SEPARATORS
  verticalSeparatorCart: {
    height: 130,
    borderRightWidth: 0.8,
    borderRightColor: color.white,
    opacity: 0.4,
    marginTop: "6%",
  },
  verticalSeparatorWhish: {
    height: 260,
    borderRightWidth: 0.8,
    borderRightColor: color.white,
    opacity: 0.4,
    marginTop: "5%",
  },
  horizontalSeparator: {
    marginHorizontal: 10,
    marginTop: "5%",
    marginBottom: "7.5%",
    width: 260,
    borderBottomWidth: 0.8,
    borderBottomColor: color.white,
    opacity: 0.4,
  },
});

export default profileStyles;
