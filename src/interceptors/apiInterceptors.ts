import axios from 'axios'
import {API_HOST_BASE_URL as BASE_URL} from 'react-native-dotenv'

const baseUrl = axios.create({
    timeout: 2000,
    baseURL: BASE_URL
})

export default baseUrl