import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, SafeAreaView } from "react-native";
import * as firebase from "firebase";
import { getUserLoggedOutAction } from "../../store/actions/userActions/userActions";
import cartStyle from "./cartStyles";
import { NavigationStackProp } from "react-navigation-stack";

type CartProps = {
  navigation: NavigationStackProp;
  getUserLoggedOut: typeof getUserLoggedOutAction;
};

const Cart: React.FC<CartProps> = ({ navigation, getUserLoggedOut }) => {
  const styles = cartStyle;

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(getUserLoggedOut)
      .then(navigation.navigate("Auth"));
  };

  return (
    <SafeAreaView>
      <Text>Cart</Text>
      <Button title="Sign Out" onPress={signOutUser} color="#000000" />
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => ({
  getUserLoggedOut: () => {
    dispatch(getUserLoggedOutAction());
  }
});

export default connect(null, mapDispatchToProps)(Cart);
