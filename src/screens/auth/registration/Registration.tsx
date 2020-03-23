import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { getAllCharactersAction } from "../../../store/actions/charactersActions/charactersActions";
import authStyles from "../authStyles";
import marvelBackground from "../../../assets/marvelBackground.jpg";
import marvel_Logo from "../../../assets/marvel_Logo.png";
import signUpBtn from "../../../assets/uiComponents/signUpBtn.png";

const { width, height } = Dimensions.get("window");

type RegistrationProps = {
  navigation: NavigationStackProp;
  getUserLogged;
};

const Registration: React.FC<RegistrationProps> = ({
  navigation,
  getUserLogged
}) => {
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
          .then(navigation.navigate("App"))
      : setErrorMessage("The username is invalid or is badly formatted.");
  };
  return (
    <View style={{ backgroundColor: "#444444" }}>
      <ImageBackground
        source={marvelBackground}
        style={{ width: width, height: height }}
        imageStyle={{ opacity: 0.2 }}
      >
        <SafeAreaView>
          <View style={{ alignItems: "center", marginTop: "10%" }}>
            <Image source={marvel_Logo} style={{ width: 114, height: 86 }} />
          </View>
          <View style={styles.errorMessage}>
            {errorMessage && <Text style={styles.error}> {errorMessage} </Text>}
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
            style={{
              marginTop: "20%",
              marginBottom: "5%",
              alignItems: "center"
            }}
            onPress={handleRegistration}
          >
            <Image source={signUpBtn} />
          </TouchableOpacity>
          <View
            style={{
              alignSelf: "center"
            }}
          >
            <Text style={{ color: "#fefefe", fontSize: 13 }}>
              Create an account to get started!
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = state => ({
  allCharacters: state.characters.allCharacters
});

const mapDispatchToProps = dispatch => ({
  getAllCharacters: () => dispatch(getAllCharactersAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
