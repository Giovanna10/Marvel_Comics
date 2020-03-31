import React from "react";
import * as firebase from "firebase";
import store from "./src/store/store";
import { Provider } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Loading from "./src/screens/auth/loading/Loading";
import Login from "./src/screens/auth/login/Login";
import Registration from "./src/screens/auth/registration/Registration";
import Releases from "./src/screens/releases/Releases";
import Characters from "./src/screens/characters/Characters";
import UserProfile from "./src/screens/userProfile/UserProfile";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { color } from "./src/utils/themes/colors";

const firebaseConfig = {
  apiKey: "AIzaSyBpeX_EvrdMmsfocQFH84PIPy0OfnkqBTI",
  authDomain: "marvel-comics-75d9b.firebaseapp.com",
  databaseURL: "https://marvel-comics-75d9b.firebaseio.com/",
  projectId: "marvel-comics-75d9b",
  storageBucket: "marvel-comics-75d9b.appspot.com",
  messagingSenderId: "710067175098",
  appId: "1:710067175098:web:6db5fc19dd7a97288c4c83",
  measurementId: "G-RDB6RJQTBZ"
};

firebase.initializeApp(firebaseConfig);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Registration: {
      screen: Registration
    }
  },
  { headerMode: "none", initialRouteName: "Login" }
);

const ReleasesStack = createStackNavigator(
  {
    Releases: {
      screen: Releases,
      navigationOptions: () => ({
        cardStyle: {
          backgroundColor: color.black
        }
      })
    }
  },
  { headerMode: "none", initialRouteName: "Releases"  }
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
    }
  },
  { headerMode: "none", initialRouteName: "Characters"  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: UserProfile,
      navigationOptions: () => ({
        cardStyle: {
          backgroundColor: color.black
        }
      })
    }
  },
  { headerMode: "none", initialRouteName: "Profile"  }
);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  switch (routeName) {
    case "Releases":
      return <Icon name="home" size={wp('8%')} color={tintColor} />;
    case "Characters":
      return <Icon name="magnify" size={wp('8%')} color={tintColor} />;
    case "Profile":
      return <Icon name="bookshelf" size={wp('8%')} color={tintColor} />;
    default:
      return null;
  }
};

const tabNavigator = createBottomTabNavigator(
  {
    Releases: ReleasesStack,
    Characters: CharactersStack,
    Profile: ProfileStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: color.white,
      inactiveTintColor: color.inactiveTab,
      style: {
        backgroundColor: color.black,
        height: hp('10%')
      }
    },
    resetOnBlur: true,
    initialRouteName: "Releases"
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      Auth: AuthStack,
      App: tabNavigator
    },
    { initialRouteName: "Loading" }
  )
);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
