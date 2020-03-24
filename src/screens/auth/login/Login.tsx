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
import loginBtn from "../../../assets/uiComponents/loginBtn.png";
import facebookBtn from "../../../assets/uiComponents/facebookBtn.png";
import googleBtn from "../../../assets/uiComponents/googleBtn.png";
/* import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"; */

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

  const handleLogin = () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(getUserLogged)
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <View
      style={{
        backgroundColor: "#444444"
        /* width: wp("84.5%"),
        height: hp("17%") */
      }}
    >
      <ImageBackground
        source={marvelBackground}
        style={{ width: width, height: height }}
        imageStyle={{ opacity: 0.2 }}
      >
        <SafeAreaView>
          <View style={{ alignItems: "center", marginVertical: "5%" }}>
            <Image source={marvel_Logo} style={{ width: 114, height: 86 }} />
          </View>
          <View style={styles.errorMessage}>
            {errorMessage ? (
              <Text style={styles.error}> {errorMessage} </Text>
            ) : (
              <Text style={styles.error}>{" "}</Text>
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
          <View style={{ marginTop: "5%", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginTop: "10%", marginBottom: "2%" }}
              onPress={handleLogin}
            >
              <Image source={loginBtn} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: "2%" }}
              // onPress={handleLogin}
            >
              <Image source={facebookBtn} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: "2%" }}
              // onPress={handleLogin}
            >
              <Image source={googleBtn} />
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 35
              }}
            >
              <Text style={{ color: "#fefefe", fontSize: 13 }}>
                Don’t have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text
                  style={{ color: "#c9082a", fontSize: 15, fontWeight: "bold" }}
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
