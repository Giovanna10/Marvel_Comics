import axios from "axios";
import { API_HOST_RELATED_COMICS as RELATED_COMICS } from "react-native-dotenv";

const relatedComics = axios.create({
  timeout: 2000,
  baseURL: RELATED_COMICS,
});

export default relatedComics;
