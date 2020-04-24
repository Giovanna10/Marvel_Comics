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
import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { color } from "./src/utils/themes/colors";
import ComicDetails from "./src/screens/comicDetails/ComicDetails";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { StatusBar, SafeAreaView, View, Text, Image } from "react-native";
import NavigationBar from "react-native-navbar-color";
import { screenDimensions } from "./src/utils/themes/sizes";
import Logout from "./src/screens/auth/logout/Logout";

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
    Logout: {
      screen: Logout,
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
    Logout: {
      screen: Logout,
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
          backgroundColor: color.black,
        },
      }),
    },
    CharacterDetail: {
      screen: CharacterDetail,
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

const DrawerContentComponent = (props) => {
  const currentUserName = firebase.auth().currentUser.displayName;
  const currentUserImage = firebase.auth().currentUser.photoURL;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop:
            screenDimensions.height < 570
              ? 300
              : screenDimensions.height < 670
                ? 400
                : 15,
        }}
      >
        <View style={{ alignSelf: 'center' }}>
          <Image source={{ uri: currentUserImage }} style={{ width: 55, height: 51, borderRadius: 50 }} />
        </View>
        <Text style={{
          color: color.title,
          fontSize: 13,
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: 10
        }}>{currentUserName}</Text>
        <View style={{ backgroundColor: "#000000cc", paddingTop: 25 }}>
          <DrawerItems {...props} />
        </View>
      </View>
    </SafeAreaView>
  )
};

const DrawerNavigationStack = createDrawerNavigator(
  {
    Releases: {
      screen: ReleasesStack,
      navigationOptions: {
        drawerLabel: "Releases",
        drawerIcon: <Icon name="buffer" size={wp("6%")} color={color.yellow} />,
      },
    },
    Characters: {
      screen: CharactersStack,
      navigationOptions: {
        drawerLabel: "Characters",
        drawerIcon: (
          <Icon name="magnify" size={wp("6%")} color={color.yellow} />
        ),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        drawerLabel: "Profile",
        drawerIcon: (
          <Icon
            name="account-circle-outline"
            size={wp("6%")}
            color={color.yellow}
          />
        ),
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: "",
        drawerIcon: (
          <Icon
            name="undo-variant"
            size={wp("6%")}
            color={color.yellow}
          />
        ),
      },

    }
  },
  {
    initialRouteName: "Releases",
    resetOnBlur: true,
    drawerWidth: wp("50%"),
    drawerType: "front",
    drawerBackgroundColor: "#000000cc",
    contentOptions: {
      activeTintColor: color.yellow,
      inactiveTintColor: color.mattYellow,
    },
    contentComponent: DrawerContentComponent,
  }
);

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
    NavigationBar.setColor(color.black);
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={color.black} />
      <AppContainer />
    </Provider>
  );
}
