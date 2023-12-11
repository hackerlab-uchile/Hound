import axios from 'axios';

const api = axios.create({
    baseurl: 'https://10.42.0.1/api',
});

export default api;