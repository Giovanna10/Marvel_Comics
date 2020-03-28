import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { getAllCharactersAction } from "../../../store/actions/charactersActions/charactersActions";
import authStyles from "../authStyles";
import marvelBackground from "../../../assets/marvelBackground.jpg";
import marvel_Logo from "../../../assets/marvel_Logo.png";
import {
  getUserLoggedAction,
  getUserLoggedOutAction
} from "../../../store/actions/userActions/userActions";
import loginBtn from "../../../assets/btnsCustom/loginBtn.png";
import facebookBtn from "../../../assets/btnsCustom/facebookBtn.png";
import googleBtn from "../../../assets/btnsCustom/googleBtn.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";

const { width, height } = Dimensions.get("window");

type LoginProps = {
  navigation: NavigationStackProp;
  getUserLogged: typeof getUserLoggedAction;
  userLogged: boolean;
};

const Login: React.FC<LoginProps> = ({ navigation, getUserLogged }) => {
  const styles = authStyles;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      ],
      webClientId:
        "710067175098-nblsjk2loski11il7vecpr89fddstspv.apps.googleusercontent.com",
      iosClientId:
        "710067175098-tp8kii0ih5unvfsff79bbcb8nce8ramc.apps.googleusercontent.com",
      offlineAccess: true,
      hostedDomain: "",
      loginHint: "",
      forceConsentPrompt: true, //ANDROID
      accountName: "" //ANDROID
    });
  }, []);

  const handleLogin = () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(getUserLogged)
      .catch(error => setErrorMessage(error.message));
  };

  const handleFBLogin = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"])
      .then(result => {
        if (result.isCancelled) {
          return Promise.reject(new Error("The User cancelled the request"));
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then(() => {
        getUserLogged();
        navigation.navigate("App");
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const handleGoogleLogin = () => {
    GoogleSignin.signIn()
      .then(data => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then(() => {
        getUserLogged();
        navigation.navigate("App");
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  return (
    <View
      style={{
        backgroundColor: "#4f4f4f"
      }}
    >
      <ImageBackground
        source={marvelBackground}
        style={{ width: width, height: height }}
        imageStyle={{ opacity: 0.2 }}
      >
        <SafeAreaView>
          <View style={styles.logo}>
            <Image
              source={marvel_Logo}
              style={{ width: 114, height: 86 }}
            />
          </View>
          <View style={styles.errorMessage}>
            {errorMessage ? (
              <Text style={styles.error}> {errorMessage} </Text>
            ) : (
              <Text> </Text>
            )}
          </View>
          <View>
            <Text style={styles.inputTitle}> Email Address </Text>
            <TextInput
              clearButtonMode="always"
              style={styles.input}
              autoCapitalize="none"
              value={email}
              onChangeText={emailValue => setEmail(emailValue)}
            />
          </View>
          <View>
            <Text style={[styles.inputTitle, { paddingTop: hp("2.75%") }]}>
              {" "}
              Password{" "}
            </Text>
            <TextInput
              clearButtonMode="always"
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={passwordValue => setPassword(passwordValue)}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginTop: hp("8%"), marginBottom: hp("1%") }}
              onPress={handleLogin}
            >
              <Image source={loginBtn} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: hp("1%") }}
              onPress={handleFBLogin}
            >
              <Image source={facebookBtn} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: hp("1%") }}
              onPress={handleGoogleLogin}
            >
              <Image source={googleBtn} />
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: hp("2%")
              }}
            >
              <Text style={{ color: "#fefefe", fontSize: wp("3.75%") }}>
                Don’t have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text
                  style={{
                    color: "#c9082a",
                    fontSize: wp("4.5%"),
                    fontWeight: "bold"
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = state => ({
  userLogged: state.user.loggedIn,
  allCharacters: state.characters.allCharacters
});

const mapDispatchToProps = dispatch => ({
  getUserLogged: () => dispatch(getUserLoggedAction()),
  getUserLoggedOut: () => dispatch(getUserLoggedOutAction()),
  getAllCharacters: () => dispatch(getAllCharactersAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
