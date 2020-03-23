import React from "react";
import * as firebase from "firebase";
import { Provider, connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Login from "./src/screens/auth/login/Login";
import store from "./src/store/store";
import Releases from "./src/screens/releases/Releases";
import Cart from "./src/screens/cart/Cart";
import Characters from "./src/screens/characters/Characters";
import Registration from "./src/screens/auth/registration/Registration";

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

firebase.initializeApp(firebaseConfig)

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
          backgroundColor: "#000000"
        }
      })
    }
  },
  { headerMode: "none" }
);

const CharactersStack = createStackNavigator(
  {
    Characters: Characters
  },
  { headerMode: "none" }
);

const CartStack = createStackNavigator(
  {
    Cart: Cart
  },
  { headerMode: "none" }
);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  switch (routeName) {
    case "Releases":
      return <Icon name="home" size={30} color={tintColor} />;
    case "Characters":
      return <Icon name="magnify" size={30} color={tintColor} />;
    case "Cart":
      return <Icon name="bookshelf" size={30} color={tintColor} />;
    default:
      return null;
  }
};

const tabNavigator = createBottomTabNavigator(
  {
    Releases: ReleasesStack,
    Characters: CharactersStack,
    Cart: CartStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: "#fefefe",
      inactiveTintColor: "#6F6F6F",
      style: {
        backgroundColor: "#000000",
        height: 65
      }
    },
    resetOnBlur: true,
    initialRouteName: "Releases"
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: tabNavigator
    },
    { initialRouteName: "Auth" }
  )
);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
