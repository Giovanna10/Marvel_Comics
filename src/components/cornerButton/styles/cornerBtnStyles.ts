import { StyleSheet } from "react-native";
import { color } from "../../../utils/themes/colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  //BORDER BUTTON
  borderCornerBtn: {
    position: "absolute",
    top: -1,
    display: "flex",
    flexDirection: "row"
  },
  borderLeftBtn: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderBottomColor: color.black,
    borderBottomWidth: 37,
    borderLeftWidth: 17
  },
  borderInsideBtn: {
    backgroundColor: color.black,
    width: 250
  },
  borderRightBtn: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightColor: "transparent",
    borderTopColor: color.black,
    borderTopWidth: 37,
    borderRightWidth: 17
  },

  //BUTTON
  cornerButton: {
    display: "flex",
    flexDirection: "row"
  },
  leftAngle: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderBottomWidth: 35,
    borderLeftWidth: 15
  },
  inside: {
    width: 250,
    justifyContent: "center",
  },
  rightAngle: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightColor: "transparent",
    borderTopWidth: 35,
    borderRightWidth: 15
  },
  text: {
      fontWeight: '500',
      fontStyle: 'italic'
  },
  socialBtn: {
      display: 'flex',
      flexDirection: 'row'
  },
  icon: {
      width: 20,
      height: 20,
      marginRight: '5%'
  }
});
