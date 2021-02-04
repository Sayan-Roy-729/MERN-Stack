import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-3b1b4-default-rtdb.firebaseio.com/'
});

export default instance;