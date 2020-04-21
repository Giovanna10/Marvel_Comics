import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import {
  getUserLoggedOutAction,
  getUserInfoAction,
} from "../../store/actions/userActions/userActions";
import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import { AppState } from "../../store/store";
import {
  User,
  UserComics,
} from "../../store/actions/actionsTypes/ActionsTypes";
import {
  View,
  Text,
  Image,
  FlatList,
  SectionList,
  ScrollView,
} from "react-native";
import Header from "../../components/header/Header";
import { LinearGradient } from "expo-linear-gradient";
import profileStyle from "./profileStyles";

type ProfileProps = {
  getUserLoggedOut: typeof getUserLoggedOutAction;
  userLogged: boolean;
  userInfo: User;
  userComics: UserComics;
};

const Profile: React.FC<ProfileProps> = ({
  getUserLoggedOut,
  userInfo,
  userComics,
}) => {
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

  const renderCartComics = ({ item, index }) => (
    <View style={styles.comic_separator_container}>
      <View style={styles.comicListContainer}>
        <Image
          source={{
            uri: `${item.thumbnail.path}/portrait_xlarge.jpg`,
          }}
          style={styles.comic}
        />
        <View style={styles.comicDescriptionContainer}>
          <Text numberOfLines={4} style={styles.comicTitle}>
            {item.title}
          </Text>
          <Text style={styles.comicDetails}>Price: {item.price}</Text>
        </View>
        {index < userComics.inCart.length - 1 ? (
          <View style={styles.horizontalSeparator} />
        ) : (
          <View style={{ marginTop: "20%" }} />
        )}
      </View>
      <View style={styles.verticalSeparatorCart} />
    </View>
  );


  const renderWhishedComics = ({ item, index }) => (
    <View style={styles.comic_separator_container}>
      <View style={styles.comicListContainer}>
        <Image
          source={{
            uri: `${item.thumbnail.path}/portrait_xlarge.jpg`,
          }}
          style={styles.comic}
        />
        <View style={styles.comicDescriptionContainer}>
          <Text numberOfLines={4} style={styles.comicTitle}>
            {item.title}
          </Text>
          <Text style={styles.comicDetails}>Price: {item.price}</Text>
        </View>
      </View>
      {index < userComics.whished.length - 1 ? (
        <View style={styles.verticalSeparatorWhish} />
      ) : null}
    </View>
  );

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
      {/* CART */}
      <FlatList
        data={userComics.inCart}
        keyExtractor={(item) => `Key-${item.id}`}
        renderItem={renderCartComics}
        ListHeaderComponent={() => (
          <View style={styles.listTitleContainer}>
            <Text style={styles.listTitle}>CART</Text>
          </View>
        )}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      />
      {/* WHISHLIST */}
      <View style={{ marginBottom: "1%" }}>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>WHISHLIST</Text>
        </View>
        <FlatList
          data={userComics.whished}
          keyExtractor={(item) => `Key-${item.id}`}
          renderItem={renderWhishedComics}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  userLogged: state.user.loggedIn,
  userInfo: state.user.user,
  userComics: state.user.userComics,
});

const mapDispatchToProps = (dispatch) => ({
  getUserLoggedOut: () => {
    dispatch(getUserLoggedOutAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
