import characters from "../../../interceptors/charactersInterceptor";
import {
  API_HOST_KEY as KEY,
  API_HOST_HASH as HASH,
  API_HOST_TS as TS,
} from "react-native-dotenv";
import {
  GET_ALL_CHARACTERS,
  GET_SINGLE_CHARACTER,
  Character,
} from "../actionsTypes/ActionsTypes";
import { NavigationParams } from "react-navigation";

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

export function getSingleCharacterAction(name: NavigationParams) {
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
        name: comic.name,
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
