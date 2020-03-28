import React from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { View, Text, Button, SafeAreaView } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { getUserLoggedOutAction } from "../../store/actions/userActions/userActions";
import profileStyle from "./profileStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

type ProfileProps = {
  navigation: NavigationStackProp;
  getUserLoggedOut: typeof getUserLoggedOutAction;
  userLogged: boolean;
};

const Profile: React.FC<ProfileProps> = ({ getUserLoggedOut }) => {
  const styles = profileStyle;

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(getUserLoggedOut);
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#ae0000", "#000000"]}
      start={{ x: 1, y: -1 }}
      end={{ x: 1, y: 0.8 }}
    >
      <SafeAreaView style={{ alignItems: "center" }}>
        <Text style={{ color: "#fefefe", fontSize: wp("10%") }}>Profile</Text>
        <View
          style={{
            width: wp("30%"),
            height: hp("5%"),
            borderWidth: 2,
            borderColor: "#fff300",
            backgroundColor: "#fff300",
            justifyContent: "center"
          }}
        >
          <Button title="Sign Out" onPress={signOutUser} color="#000000" />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  userLogged: state.user.loggedIn
});

const mapDispatchToProps = dispatch => ({
  getUserLoggedOut: () => {
    dispatch(getUserLoggedOutAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
