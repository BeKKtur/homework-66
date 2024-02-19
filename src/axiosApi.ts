import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://batyrbekov-bektur-1-default-rtdb.europe-west1.firebasedatabase.app'
});

export default axiosApi