import comicsOfYear from "../../../interceptors/comicsInterceptor";
import { GET_YEAR_COMICS, Comic, Creator } from "../actionsTypes/ActionsTypes";
import { API_HOST_KEY as KEY, API_HOST_HASH as HASH, API_HOST_TS as TS } from "react-native-dotenv";
import { format, startOfYear } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");
const beginningYear = format(startOfYear(new Date()), "yyyy-MM-dd");

export function getYearlyComicsAction() {
  const params ={
    apikey: KEY,
    hash: HASH,
    ts: TS,
    dateRange: `${beginningYear},${today}`,
    orderBy: 'onsaleDate',
    format: 'comic',
    formatType: 'comic',
  }
  return async dispatch => { 
    const { data } = await comicsOfYear.get('', {params});    
    const yearlyComics: Comic[] = data.data.results.map(comic => {
      const itemsCreators: Creator = comic.creators.items.map(creator => ({
        name: creator.name,
        role: creator.role
      }));
      const characters = comic.characters.items.map(
        character => character.name
      );
      return {
        id: comic.id,
        title: comic.title,
        description: comic.description,
        modified: comic.modified,
        pageCount: comic.pageCount,
        price: comic.prices[0].price,
        thumbnail: comic.thumbnail,
        images: comic.images,
        creators: {
          items: itemsCreators,
          returned: comic.creators.returned
        },
        characters: characters
      };
    });
    return dispatch({
      type: GET_YEAR_COMICS,
      payload: yearlyComics
    });
  };
}
