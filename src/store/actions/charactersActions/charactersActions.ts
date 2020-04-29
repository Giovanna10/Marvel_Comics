import characters from "../../../interceptors/charactersInterceptor";
import {
  API_HOST_KEY as KEY,
  API_HOST_HASH as HASH,
  API_HOST_TS as TS,
} from "react-native-dotenv";
import {
  IS_FROM_CHARACTER,
  ISNT_FROM_CHARACTER,
  GET_ALL_CHARACTERS,
  GET_SINGLE_CHARACTER,
  GET_SELECTED_COMIC_ID_IN_CHARACTER,
  RESET_SELECTED_COMIC_ID_IN_CHARACTER,
  ADD_TO_CART_FROM_CHARACTER,
  Character,
  Comic,
} from "../actionsTypes/ActionsTypes";

export function getAllCharactersAction(offset?: number) {
  const params = {
    apikey: KEY,
    hash: HASH,
    ts: TS,
    orderBy: "name",
    offset: `${offset}`,
    limit: "8",
  };
  return async (dispatch) => {
    const { data } = await characters.get("", { params });
    const allCharacters: Character[] = data.data.results.map(
      (character) => ({
        id: character.id,
        name: character.name,
        description: character.description,
        thumbnail: character.thumbnail,
        comics: {
          items: character.comics.items,
          available: character.comics.available,
          returned: character.comics.returned,
        },
      })
    );
    return dispatch({
      type: GET_ALL_CHARACTERS,
      payload: allCharacters,
    });
  };
}

export function getSingleCharacterAction(name: string) {
  const params = {
    apikey: KEY,
    hash: HASH,
    ts: TS,
    name: `${name}`,
  };
  return async (dispatch) => {
    const { data } = await characters.get("", { params });
    const results = data.data.results[0];
    const comicsItems = results.comics.items.map((comic) => {
      const comicId = comic.resourceURI.split("comics/")[1];
      return {
        id: comicId,
        title: comic.name,
      };
    });
    const singleCharacter: Character = {
      id: results.id,
      name: results.name,
      description: results.description,
      thumbnail: results.thumbnail,
      comics: {
        items: comicsItems,
        available: results.comics.available,
        returned: results.comics.returned,
      },
    };
    return dispatch({
      type: GET_SINGLE_CHARACTER,
      payload: singleCharacter,
    });
  };
}

export function setFromCharacterAction() {
  return {
    type: IS_FROM_CHARACTER,
    payload: true
  }
}

export function resetFromCharacterAction() {
  return {
    type: ISNT_FROM_CHARACTER,
    payload: false
  }
}

export function addComicFromCharacterAction(selectedComic: Comic) {
  return {
    type: ADD_TO_CART_FROM_CHARACTER,
    payload: {
      ...selectedComic,
      qtyInCart: 1
    },
  };
}

export function getSelectedComicIdInCharacterAction(selectedComic: Comic) {
  return {
    type: GET_SELECTED_COMIC_ID_IN_CHARACTER,
    payload: selectedComic.id,
  };
}

export function resetSelectedComicIdInCharacterAction() {
  return {
    type: RESET_SELECTED_COMIC_ID_IN_CHARACTER,
    payload: 0,
  };
}
