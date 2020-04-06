import React, { useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import marvelBackground from "../../../assets/marvelBackground.jpg";
import marvel_Logo from "../../../assets/marvel_Logo.png";
import { color } from "../../../utils/themes/colors";
import authStyles from "../authStyles";
import CornerButton from "../../../components/cornerButton/CornerButton";
import { getUserLoggedAction } from "../../../store/actions/userActions/userActions";
import { AppState } from "../../../store/store";

type RegistrationProps = {
  getUserLogged: typeof getUserLoggedAction;
};

const Registration: React.FC<RegistrationProps> = () => {
  const styles = authStyles;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegistration = () => {
    name.length > 0
      ? firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            return userCredentials.user.updateProfile({
              displayName: name
            });
          })
          .catch(error => setErrorMessage(error.message))
      : setErrorMessage("The username is invalid.");
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
            <Text style={styles.inputTitle}> Username </Text>
            <TextInput
              clearButtonMode="always"
              style={styles.input}
              autoCapitalize="none"
              value={name}
              onChangeText={nameValue => setName(nameValue)}
            />
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
          <TouchableOpacity
            style={styles.signupBtnContainer}
            onPress={handleRegistration}
          >
            <CornerButton textBtn='SIGN UP' btnColor={color.yellow} />
          </TouchableOpacity>
          <View
            style={styles.warningContainer}
          >
            <Text style={styles.warning}>
              Create an account to get started!
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state:AppState) => ({
  loggedIn: state.user.loggedIn
});

const mapDispatchToProps = dispatch => ({
  getUserLogged: () => dispatch(getUserLoggedAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
