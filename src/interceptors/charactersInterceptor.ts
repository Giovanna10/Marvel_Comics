import axios from "axios";
import { API_HOST_CHARACTERS as CHARACTERS } from "react-native-dotenv";

const characters = axios.create({
  baseURL: CHARACTERS
});

export default characters;
