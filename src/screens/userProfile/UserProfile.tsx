import React from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { getUserLoggedOutAction } from "../../store/actions/userActions/userActions";
import profileStyle from "./profileStyles";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/header/Header";

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
      colors={["#000000", "#ae0000"]}
      start={{ x: 1, y: 0.4 }}
      end={{ x: 1, y: 2 }}
    >
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.btnContainer}>
          <Button title="Sign Out" onPress={signOutUser} color="#000000" />
        </View>
      </View>
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
