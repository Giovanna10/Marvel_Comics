import { StyleSheet } from "react-native";
import { color } from "../../utils/themes/colors";
import { size, screenDimensions } from "../../utils/themes/sizes";

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
    height: 30,
    justifyContent: 'center',
    backgroundColor: "#bdbdbd5c",
    marginBottom: '4%'
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
    width: screenDimensions.height < 670 ? 85 : 120,
    height: screenDimensions.height < 670 ? 135 : 180,
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
    position: 'absolute',
  },
  comicDetails: {
    color: color.subtitle,
    fontSize: size.comicDetails,
    marginTop: 5,
    position: 'absolute',
    top: 30,
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
    marginTop: 5
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    width: 120,
    marginBottom: 5
  },
  leftIconContainer: { width: "85%", marginTop: 10 },
  rightIconContainer: { width: "15%", marginTop: 10 },
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
    borderTopWidth: 0.2,
    borderTopColor: color.mattYellow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20
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
    marginTop: 10
  },
  checkoutButtonLabel: {
    textAlign: 'center', 
    fontSize: size.titleDetails,
    color: color.black,
  }
});

export default profileStyles;
