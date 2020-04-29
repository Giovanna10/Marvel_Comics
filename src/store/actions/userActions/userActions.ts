import {
  USER_LOGGED,
  USER_LOGGED_OUT,
  USER_INFO,
  GET_USER_COMICS,
  RESET_USER_COMICS,
  GET_SELECTED_COMIC_IN_CART,
  RESET_SELECTED_COMIC_IN_CART,
  GET_SELECTED_COMIC_ID_IN_CART,
  RESET_SELECTED_COMIC_ID_IN_CART,
  ADD_COMIC_FROM_WHISHES,
  Comic,
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
    image:
      firebase.auth().currentUser.photoURL === null
        ? ""
        : firebase.auth().currentUser.photoURL,
  };
  return { type: USER_INFO, payload: userInfo };
}

export function getUserComicsAction(title?: string, qtyInCart?: number) {
  return async (dispatch) => {
    const userComics = {
      whished: [],
      inCart: [],
    };

    const whishedCollection = await db
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .collection("Whishlist")
      .get();
    userComics.whished = whishedCollection.docs.map((doc) => {
      return doc.data();
    });

    if (title !== undefined && qtyInCart !== undefined) {
      db.collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .collection("Cart")
        .doc(`${title}`)
        .update({ qtyInCart: qtyInCart });
    }

    const cartCollection = await db
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .collection("Cart")
      .get();
    userComics.inCart = cartCollection.docs.map((doc) => {
      return doc.data();
    });

    return dispatch({
      type: GET_USER_COMICS,
      payload: userComics,
    });
  };
}

export function resetUserComicsAction() {
  return {
    type: RESET_USER_COMICS,
    payload: {
      whished: [],
      inCart: [],
    },
  };
}

export function getComicInCartByIdAction(
  comicId: number | string,
  comicsArray: Comic[]
) {
  const selectedComic: Comic = comicsArray.find(
    (comic) => comic.id === comicId
  );
  return {
    type: GET_SELECTED_COMIC_IN_CART,
    payload: selectedComic,
  };
}

export function resetSelectedComicInCartAction() {
  return {
    type: RESET_SELECTED_COMIC_IN_CART,
    payload: {
      id: 0,
      title: "",
      comicNumber: "",
      description: "",
      modificationDate: "",
      creationDate: "",
      pageCount: 0,
      price: 0,
      thumbnail: {
        path: "",
        extension: "",
      },
      images: [],
      creators: {
        items: [],
        returned: 0,
      },
      characters: [],
      qtyInCart: 0,
    },
  };
}

export function getSelectedComicIdInCartAction(selectedComic: Comic) {
  return {
    type: GET_SELECTED_COMIC_ID_IN_CART,
    payload: selectedComic.id,
  };
}

export function resetSelectedComicIdInCartAction(){
  return {
    type: RESET_SELECTED_COMIC_ID_IN_CART,
    payload: 0,
  };
}

export function addComicFromWhishesAction(selectedComic: Comic) {
  return {
    type: ADD_COMIC_FROM_WHISHES,
    payload: {
      ...selectedComic,
      qtyInCart: 1,
    },
  };
}
