import axios from "axios";
import { API_HOST_COMICS as COMICS } from "react-native-dotenv";

const comicsOfYear = axios.create({
  baseURL: COMICS
});

export default comicsOfYear;
