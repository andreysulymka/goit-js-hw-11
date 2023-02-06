import axios from "axios";

const ENDPOINT = 'https://pixabay.com/api';
const KEY = '33419599-8df6ee82ed12cd9ffb5884c17'


function fetchPhoto(photo) {
    return axios.get(`${ENDPOINT}/?key=${KEY}&q=${photo}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`).then((res)=>res.data);
};

export { fetchPhoto };