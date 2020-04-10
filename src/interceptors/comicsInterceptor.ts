import axios from "axios";
import { API_HOST_COMICS as COMICS } from "react-native-dotenv";

const comics = axios.create({
  timeout: 2000,
  baseURL: COMICS,
});

export default comics;
