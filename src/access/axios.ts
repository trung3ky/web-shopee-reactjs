import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://songs-api-thq.herokuapp.com/',
});
