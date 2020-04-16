import comics from "../../../interceptors/comicsInterceptor";
import news from "../../../interceptors/newsInterceptor";
import relatedComics from "../../../interceptors/relatedComics";
import {
  Comic,
  Creator,
  Character,
  GET_YEAR_COMICS,
  GET_NEWS,
  GET_SELECTED_COMIC,
  GET_RELATED_COMICS,
  SET_UNMOUNT
} from "../actionsTypes/ActionsTypes";
import {
  API_HOST_KEY as KEY,
  API_HOST_HASH as HASH,
  API_HOST_TS as TS,
} from "react-native-dotenv";
import { format, startOfYear } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");
const beginningYear = format(startOfYear(new Date()), "yyyy-MM-dd");

function usefulFunction(
  title: string,
  creationDate: string,
  modificationDate: string,
  creators: Creator[],
  characters: Character[]
) {
  const characterItems = characters.map(
    (character: Character) => character.name
  );
  const creatorsItems = creators.map((creator) => {
    const id = creator.resourceURI.split("creators/")[1];
    return {
      resourceURI: creator.resourceURI,
      id: id,
      name: creator.name,
      role: creator.role,
    };
  });
  return {
    title: title.split("#")[0],
    comicN: title.split("#")[1],
    creationDate: JSON.stringify(creationDate).slice(1, 11),
    modificationDate: JSON.stringify(modificationDate).slice(1, 11),
    creators: creatorsItems,
    characters: characterItems,
  };
}

export function getComicsNewsAction() {
  const params = {
    action: "getArticles",
    keyword: "Diamond Comics",
    articlesCount: 15,
    articleSortBy: "date",
    articlesSortByAsc: false,
    resultType: "articles",
    dataType: "news",
    apiKey: "b9b0668b-f6e0-4cae-b41c-5048c43cdbfb",
  };
  return async (dispatch) => {
    const { data } = await news.get("", { params });
    const comicsNews = data.articles.results.map((news) => ({
      id: news.uri,
      title: news.title,
      source: news.source.title,
      body: news.body,
      coverImage: news.image,
    }));
    return dispatch({
      type: GET_NEWS,
      payload: comicsNews,
    });
  };
}

export function getYearlyComicsAction(offset?: number) {
  const params = {
    apikey: KEY,
    hash: HASH,
    ts: TS,
    dateRange: `${beginningYear},${today}`,
    orderBy: "modified",
    offset: offset === undefined ? 0 : `${offset}`,
    limit: "8",
    format: "comic",
    formatType: "comic",
  };
  return async (dispatch) => {
    const { data } = await comics.get("", { params });
    const yearlyComics: Comic[] = data.data.results.map((comic) => {
      const usefulData = usefulFunction(
        comic.title,
        comic.dates[0].date,
        comic.modified,
        comic.creators.items,
        comic.characters.items
      );

      return {
        id: comic.id,
        title: usefulData.title,
        comicNumber: usefulData.comicN,
        description: comic.description,
        modificationDate: usefulData.modificationDate,
        creationDate: usefulData.creationDate,
        pageCount: comic.pageCount,
        price: comic.prices[0].price,
        thumbnail: comic.thumbnail,
        images: comic.images,
        creators: {
          items: usefulData.creators,
          returned: comic.creators.returned,
        },
        characters: usefulData.characters,
      };
    });

    return dispatch({
      type: GET_YEAR_COMICS,
      payload: yearlyComics,
    });
  };
}

export function getComicByIdAction(comicId: number, yearlyComics: Comic[], /* character?: boolean */) {
  return (dispatch) => {
    const selectedComic = yearlyComics.find((comic) => comic.id === comicId);
    //const selectedComicCharacter = request...
    return dispatch({
      type: GET_SELECTED_COMIC,
      payload: /* character ? selectedComicCharacter : */ selectedComic,
    });
  };
}

export function setComponentUnmountAction(){
  return {
    type: SET_UNMOUNT,
    payload: []
  }
}

export function getRelatedComicsByCreatorsIdAction(
  creators: Creator[],
  offset?: number
) {
  const params = {
    apikey: KEY,
    hash: HASH,
    ts: TS,
    offset: offset === undefined ? 0 : `${offset}`,
    limit: "8",
    format: "comic",
    formatType: "comic",
  };
  return async (dispatch) => {
    const editor = creators.find(creator => creator.role === "editor")

    const {data} = await relatedComics.get(`${editor.id}/comics`, { params })

    const related: Comic[] = data.data.results.map((comic) => {
      const usefulData = usefulFunction(
        comic.title,
        comic.dates[0].date,
        comic.modified,
        comic.creators.items,
        comic.characters.items
      );
      
      return {
        id: comic.id,
        title: usefulData.title,
        comicNumber: usefulData.comicN,
        description: comic.description,
        modificationDate: usefulData.modificationDate,
        creationDate: usefulData.creationDate,
        pageCount: comic.pageCount,
        price: comic.prices[0].price,
        thumbnail: comic.thumbnail,
        images: comic.images,
        creators: {
          items: usefulData.creators,
          returned: comic.creators.returned,
        },
        characters: usefulData.characters,
      };
    });

    return dispatch({
      type: GET_RELATED_COMICS,
      payload: related,
    });
  };
}
