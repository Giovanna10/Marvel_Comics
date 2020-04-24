import { StyleSheet } from "react-native";
import { color } from "../../utils/themes/colors";
import { size } from "../../utils/themes/sizes";

const profileStyles = StyleSheet.create({
  //LISTS
  cartListTitleContainer: {
    borderTopWidth: 0.2,
    borderTopColor: color.mattYellow,
    marginBottom: "4%",
    backgroundColor: "#bdbdbd1c",
  },
  cartTitleContainer: {
    width: 60,
    alignSelf: "flex-end",
    marginRight: "4%",
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
    marginHorizontal: 20,
  },
  comicContainerWhish: {
    marginHorizontal: 20,
    marginBottom: 4,
  },
  comic: {
    width: 85,
    height: 135,
    borderColor: color.subtitle,
    borderWidth: 0.7,
    marginBottom: 10,
    alignSelf: 'center',
  },
  comicDescriptionContainer: {
    width: 120,
    height: 50,
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
    marginTop: 5,
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
  icon: { width: 20, height: 20 },
  //SEPARATORS
  verticalSeparator: {
    height: 210,
    borderRightWidth: 0.8,
    borderRightColor: color.white,
    opacity: 0.4,
    marginTop: "5%",
  },
  //CHECKOUT
  totalDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingTop: 5,
  },
  totalDetailsTitles: {
    fontSize: size.description,
    color: color.white,
  },
  totalDetailsValues: {
    fontSize: 15,
    fontWeight: 'bold',
    color: color.yellow,
  },
  checkoutButtonContainer: {
    alignSelf: 'center',
    backgroundColor: color.yellow,
    width: 225,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 15
  },
  checkoutButtonLabel: {
    textAlign: 'center', 
    fontSize: size.titleDetails,
    color: color.black,
  }
});

export default profileStyles;
