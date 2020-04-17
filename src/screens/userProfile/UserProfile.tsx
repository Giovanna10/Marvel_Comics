import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { db } from "../../../App";
import {
  getUserLoggedOutAction,
  getUserInfoAction,
  getUserComicsAction,
} from "../../store/actions/userActions/userActions";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import { AppState } from "../../store/store";
import { User, UserComics } from "../../store/actions/actionsTypes/ActionsTypes";
import { View, Text, Button, Image } from "react-native";
import Header from "../../components/header/Header";
import { LinearGradient } from "expo-linear-gradient";
import profileStyle from "./profileStyles";


type ProfileProps = {
  getUserLoggedOut: typeof getUserLoggedOutAction;
  userLogged: boolean;
  getUserInfo: typeof getUserInfoAction;
  userInfo: User;
  getUserComics: typeof getUserComicsAction;
  userComics: UserComics
};

const Profile: React.FC<ProfileProps> = ({
  getUserLoggedOut,
  getUserInfo,
  userInfo,
  getUserComics,
  userComics
}) => {
  const styles = profileStyle;

  //MANAGE UPDATING USER COMICS

  useEffect(() => {
    getUserInfo();  
    getUserComics();  
  }, []);

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
      colors={["#000000", "#ae0000"]}
      start={{ x: 1, y: 0.4 }}
      end={{ x: 1, y: 2 }}
    >
      <Header />
      {/* <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.btnContainer}>
          <Button title="Sign Out" onPress={signOutUser} color="#000000" />
        </View>
      </View> */}
      {/* USER INFO */}
      <View style={styles.userContainer}>
        <View style={styles.userImageContainer}>
          <Image source={{ uri: userInfo.image }} style={styles.userImage} />
        </View>
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{userInfo.name}</Text>
        </View>
      </View>
      {/* WISHLIST */}
      <View>
        <Text style={styles.listTitle}>WISHLIST</Text>

      </View>
      {/* CART */}
      <View>
        <Text style={styles.listTitle}>CART</Text>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  userLogged: state.user.loggedIn,
  userInfo: state.user.user,
  userComics: state.user.userComics
});

const mapDispatchToProps = (dispatch) => ({
  getUserLoggedOut: () => {
    dispatch(getUserLoggedOutAction());
  },
  getUserInfo: () => dispatch(getUserInfoAction()),
  getUserComics: () => dispatch(getUserComicsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
