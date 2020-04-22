import {
  USER_LOGGED,
  USER_LOGGED_OUT,
  USER_INFO,
  GET_USER_COMICS,
} from "../actionsTypes/ActionsTypes";
import * as firebase from "firebase";
import { db } from "../../../../App";

export function setUserLoggedAction() {
  return { type: USER_LOGGED, payload: true };
}

export function setUserLoggedOutAction() {
  return {
    type: USER_LOGGED_OUT,
    payload: {
      name: "",
      image: "",
    },
  };
}

export function getUserInfoAction() {
  const userInfo = {
    name: firebase.auth().currentUser.displayName,
    image: firebase.auth().currentUser.photoURL === null ? "" : firebase.auth().currentUser.photoURL,
  };
  return { type: USER_INFO, payload: userInfo };
}

export function getUserComicsAction() {
  return async (dispatch) => {
    const userComics = {
      whished: [],
      inCart: [],
    };
    const whishedCollection = await db.collection("Whishlist").get();
    userComics.whished = whishedCollection.docs.map((doc) => {
      return doc.data();
    });

    const cartCollection = await db.collection("Cart").get();
    userComics.inCart = cartCollection.docs.map((doc) => {
      return doc.data();
    });

    return dispatch({
      type: GET_USER_COMICS,
      payload: userComics,
    });
  };
}
