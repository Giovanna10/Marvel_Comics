import React, { useState } from "react";
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
import signUpBtn from "../../../assets/btnsCustom/signUpBtn.png";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

type RegistrationProps = {
  navigation: NavigationStackProp;
  getUserLogged;
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
    <View style={{ backgroundColor: "#4f4f4f" }}>
      <ImageBackground
        source={marvelBackground}
        style={{ width: width, height: height }}
        imageStyle={{ opacity: 0.2 }}
      >
        <SafeAreaView>
          <View style={{ alignItems: "center", marginTop: hp('4.75%') }}>
            <Image source={marvel_Logo} style={{ width: wp('42%'), height: hp('15%') }} />
          </View>
          <View style={styles.errorMessage}>
            {errorMessage ? (
              <Text style={styles.error}> {errorMessage} </Text>
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
            <Text style={[styles.inputTitle, {paddingTop: hp("2.75%")}]}> Email Address </Text>
            <TextInput
              clearButtonMode="always"
              style={styles.input}
              autoCapitalize="none"
              value={email}
              onChangeText={emailValue => setEmail(emailValue)}
            />
          </View>
          <View>
            <Text style={[styles.inputTitle, {paddingTop: hp("2.75%")}]}> Password </Text>
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
              marginTop: hp('12%'),
              marginBottom: hp('5%'),
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
            <Text style={{ color: "#fefefe", fontSize: wp('3.75%') }}>
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
