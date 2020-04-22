import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import {
  setUserLoggedAction,
} from "../../../store/actions/userActions/userActions";
import marvelBackground from "../../../assets/marvelBackground.jpg";
import marvel_Logo from "../../../assets/marvel_Logo.png";
import { color } from "../../../utils/themes/colors";
import authStyles from "../authStyles";
import CornerButton from "../../../components/cornerButton/CornerButton";
import { AppState } from "../../../store/store";

type LoginProps = {
  navigation: NavigationStackProp;
  setUserLogged: typeof setUserLoggedAction;
};

const Login: React.FC<LoginProps> = ({ navigation, setUserLogged }) => {
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
      .then(() => setUserLogged())
      .catch(error => setErrorMessage(error.message));
  };

  const handleFBLogin = () => {
    LoginManager.logInWithPermissions(["public_profile"])
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
        setUserLogged();
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
        setUserLogged();
        navigation.navigate("App");
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
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
          <View style={styles.error}>
            {errorMessage ? (
              <Text style={styles.errorMessage}> {errorMessage} </Text>
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
            <Text style={styles.inputTitle}> Password </Text>
            <TextInput
              clearButtonMode="always"
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={passwordValue => setPassword(passwordValue)}
            />
          </View>

          <View style={styles.loginBtnsContainer}>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={handleLogin}
            >
              <CornerButton textBtn="LOGIN" btnColor={color.yellow} textColor={color.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={handleFBLogin}
            >
              <CornerButton
                social
                fbBtn
                textBtn="Login with Facebook"
                btnColor="#4269A4"
                textColor={color.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={handleGoogleLogin}
            >
              <CornerButton
                social
                googleBtn
                textBtn="Login with Google"
                btnColor={color.white}
                textColor={color.black}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.warningContainer}>
            <Text style={styles.warning}>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  userLogged: state.user.loggedIn
});

const mapDispatchToProps = dispatch => ({
  setUserLogged: () => dispatch(setUserLoggedAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
