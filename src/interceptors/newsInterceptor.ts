import axios from 'axios'
import { API_HOST_NEWS as NEWS } from 'react-native-dotenv'

const news = axios.create({
    baseURL: NEWS
})

export default news