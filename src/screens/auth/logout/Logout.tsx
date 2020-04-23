import React from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import {
  setUserLoggedOutAction,
  resetUserComicsAction,
} from "../../../store/actions/userActions/userActions";
import marvelBackground from "../../../assets/marvelBackground.jpg";
import marvel_Logo from "../../../assets/marvel_Logo.png";
import { color } from "../../../utils/themes/colors";
import authStyles from "../authStyles";
import CornerButton from "../../../components/cornerButton/CornerButton";
import { AppState } from "../../../store/store";

type LogoutProps = {
  navigation: NavigationStackProp;
  setUserLoggetOut: typeof setUserLoggedOutAction;
  resetUserComics: typeof resetUserComicsAction;
};

const Logout: React.FC<LogoutProps> = ({
  navigation,
  setUserLoggetOut,
  resetUserComics,
}) => {
  const styles = authStyles;

  const signOutUser = () => {
    resetUserComics();
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserLoggetOut();
        LoginManager.logOut();
        GoogleSignin.signOut();
      });
    navigation.navigate("Login");
  };

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={marvelBackground}
        style={styles.imageBackground}
        imageStyle={{ opacity: 0.1 }}
      >
        <SafeAreaView>
          <View style={styles.logoContainer}>
            <Image source={marvel_Logo} style={styles.logo} />
          </View>
          <View style={{ marginTop: "50%" }}>
            <Text
              style={{
                color: color.red,
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
                marginBottom: "10%",
              }}
            >
              Are you sure you want to logout
            </Text>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={signOutUser}
            >
              <CornerButton
                textBtn="LOGOUT"
                btnColor={color.red}
                textColor={color.white}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Releases")}>
              <Text
                style={{
                  color: color.white,
                  fontWeight: "bold",
                  fontSize: 20,
                  textAlign: "center",
                  marginTop: "6%",
                }}
              >
                Come back to Home Page
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  userLogged: state.user.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setUserLoggetOut: () => dispatch(setUserLoggedOutAction()),
  resetUserComics: () => dispatch(resetUserComicsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
