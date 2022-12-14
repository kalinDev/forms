import axios from 'axios';

export const api = axios.create({
    baseURL: "http://165.232.150.227:8080/"
});
