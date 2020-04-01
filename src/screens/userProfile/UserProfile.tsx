import React from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { View, Text, Button, SafeAreaView } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { getUserLoggedOutAction } from "../../store/actions/userActions/userActions";
import profileStyle from "./profileStyles";
import { LinearGradient } from "expo-linear-gradient";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";

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
      .then(() => {
        getUserLoggedOut();
        LoginManager.logOut();
        GoogleSignin.signOut();
      });
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#ae0000", "#000000"]}
      start={{ x: 1, y: -1 }}
      end={{ x: 1, y: 0.8 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.btnContainer}>
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
