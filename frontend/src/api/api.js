import axios from 'axios';

const api = axios.create({
    baseurl: 'https://localhost:8000',
});

export default api;