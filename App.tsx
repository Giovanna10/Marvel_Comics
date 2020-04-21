import React, { useEffect } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import store from "./src/store/store";
import { Provider } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Loading from "./src/components/loading/Loading";
import Login from "./src/screens/auth/login/Login";
import Registration from "./src/screens/auth/registration/Registration";
import Releases from "./src/screens/releases/Releases";
import Characters from "./src/screens/characters/Characters/Characters";
import CharacterDetail from "./src/screens/characters/Character Detail/CharacterDetail";
import UserProfile from "./src/screens/userProfile/UserProfile";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from "./src/utils/themes/colors";
import ComicDetails from "./src/screens/comicDetails/ComicDetails";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Button, SafeAreaView, View } from "react-native";
import { LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import { getUserLoggedOutAction } from "./src/store/actions/userActions/userActions";
import NavigationBar from 'react-native-navbar-color'

const firebaseConfig = {
  apiKey: "AIzaSyBpeX_EvrdMmsfocQFH84PIPy0OfnkqBTI",
  authDomain: "marvel-comics-75d9b.firebaseapp.com",
  databaseURL: "https://marvel-comics-75d9b.firebaseio.com/",
  projectId: "marvel-comics-75d9b",
  storageBucket: "marvel-comics-75d9b.appspot.com",
  messagingSenderId: "710067175098",
  appId: "1:710067175098:web:6db5fc19dd7a97288c4c83",
  measurementId: "G-RDB6RJQTBZ",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Registration: {
      screen: Registration,
    },
  },
  { headerMode: "none", initialRouteName: "Login" }
);

const ReleasesStack = createStackNavigator(
  {
    Releases: {
      screen: Releases,
      navigationOptions: () => ({
        cardStyle: {
          backgroundColor: color.black,
        },
      }),
    },
    ComicDetails: {
      screen: ComicDetails,
      navigationOptions: () => ({
        cardStyle: {
          backgroundColor: color.black,
        },
      }),
    },
  },
  { headerMode: "none", initialRouteName: "Releases" }
);

const CharactersStack = createStackNavigator(
  {
    Characters: {
      screen: Characters,
      navigationOptions: () => ({
        cardStyle: {
          backgroundColor: color.black
        }
      })
    },
    CharacterDetail: {
      screen: CharacterDetail,
      navigationOptions: () => ({
        cardStyle: {
          backgroundColor: color.black
        }
      })
    },
    ComicDetails: {
      screen: ComicDetails,
      navigationOptions: () => ({
        cardStyle: {
          backgroundColor: color.black,
        },
      }),
    },
  },
  { headerMode: "none", initialRouteName: "Characters" }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: UserProfile,
      navigationOptions: () => ({
        cardStyle: {
          backgroundColor: color.black,
        },
      }),
    },
  },
  { headerMode: "none", initialRouteName: "Profile" }
);

const signOutUser = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      getUserLoggedOutAction();
      LoginManager.logOut();
      GoogleSignin.signOut();
    });
};

const DrawerContentComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <DrawerItems {...props} />
    <View style={{ paddingTop: 485 }}>
      <Button title="Sign Out" onPress={signOutUser} color={color.red} />
    </View>
  </SafeAreaView>
)

const DrawerNavigationStack = createDrawerNavigator(
  {
    Releases: {
      screen: ReleasesStack,
      navigationOptions: {
        drawerLabel: 'Releases',
        drawerIcon: <Icon name="buffer" size={wp("6%")} color={color.yellow} />
      },
    },
    Characters: {
      screen: CharactersStack,
      navigationOptions: {
        drawerLabel: 'Characters',
        drawerIcon: <Icon name="magnify" size={wp("6%")} color={color.yellow} />
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: <Icon name="account-circle-outline" size={wp("6%")} color={color.yellow} />
      },
    },
  },
  {
    initialRouteName: 'Releases',
    resetOnBlur: true,
    drawerWidth: wp('50%'),
    drawerType: 'front',
    drawerBackgroundColor: color.black,
    contentOptions: {
      activeTintColor: color.yellow,
      inactiveTintColor: color.white,
    },
    contentComponent: DrawerContentComponent
  })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      Auth: AuthStack,
      App: DrawerNavigationStack,
    },
    { initialRouteName: "Loading" }
  )
);

export default function App() {

  useEffect(() => {
    NavigationBar.setColor(color.black)
  }, [])

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
