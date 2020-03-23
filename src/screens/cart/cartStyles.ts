import { StyleSheet } from "react-native";

const cartStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  triangleCorner: {
    position: "absolute",
    top: 105,
    left: 0,
    width: 300,
    height: 100,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 50,
    borderTopWidth: 80,
    borderRightColor: "transparent",
    borderTopColor: "gray"
  },
  triangleCorner1: {
    position: "absolute",
    top: 100,
    left: 0,
    width: 130,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 50,
    borderTopWidth: 90,
    borderRightColor: "transparent",
    borderTopColor: "green"
  },
  triangleCornerLayer: {
    position: "absolute",
    top: 107,
    left: 0,
    width: 297,
    height: 100,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 47,
    borderTopWidth: 75,
    borderRightColor: "transparent",
    borderTopColor: "white"
  }
});

export default cartStyle
