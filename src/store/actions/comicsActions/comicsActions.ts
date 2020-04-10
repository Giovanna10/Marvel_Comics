import comics from "../../../interceptors/comicsInterceptor";
import { news } from "../../../interceptors/newsInterceptor";
import {
  GET_YEAR_COMICS,
  Comic,
  Creator,
  GET_NEWS,
  GET_SELECTED_COMIC,
  Character,
} from "../actionsTypes/ActionsTypes";
import {
  API_HOST_KEY as KEY,
  API_HOST_HASH as HASH,
  API_HOST_TS as TS,
} from "react-native-dotenv";
import { format, startOfYear } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");
const beginningYear = format(startOfYear(new Date()), "yyyy-MM-dd");

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
      const splitTitle = comic.title.split("#");
      const title = splitTitle[0];
      const comicN = splitTitle[1];

      const creationDate = JSON.stringify(comic.dates[0].date).slice(1, 11);
      const modificationDate = JSON.stringify(comic.modified).slice(1, 11);

      const itemsCreators: Creator[] = comic.creators.items.map((creator: Creator) => ({
        name: creator.name,
        role: creator.role,
      }));

      const characters = comic.characters.items.map(
        (character: Character) => character.name
      );

      return {
        id: comic.id,
        title: title,
        comicNumber: comicN,
        description: comic.description,
        modificationDate: modificationDate,
        creationDate: creationDate,
        pageCount: comic.pageCount,
        price: comic.prices[0].price,
        thumbnail: comic.thumbnail,
        images: comic.images,
        creators: {
          items: itemsCreators,
          returned: comic.creators.returned,
        },
        characters: characters,
      };
    });
    
    return dispatch({
      type: GET_YEAR_COMICS,
      payload: yearlyComics,
    });
  };
}

export function getComicByIdAction(comicId: number, yearlyComics: Comic[]) {
  return dispatch => {
    const selectedComic = yearlyComics.find(comic => comic.id === comicId)
    return dispatch({
      type: GET_SELECTED_COMIC,
      payload: selectedComic
    })
  }


  /* return async (dispatch) => {
    const params = {
      apikey: KEY,
      hash: HASH,
      ts: TS,
    };
    const { data } = await comics.get(`/${comicId}`, {params});
    const comicDetails: Comic = {
      id: data.data.results[0].id,
  title: data.data.results[0].title,
  comicNumber: data.data.results[0].,
  description: data.data.results[0].,
  modificationDate: data.data.results[0].,
  creationDate: data.data.results[0].,
  pageCount: data.data.results[0].,
  price: data.data.results[0].,
  thumbnail: data.data.results[0].,
  images: data.data.results[0].,
  creators: data.data.results[0].,
  characters: data.data.results[0].,
    }
  }; */
}
