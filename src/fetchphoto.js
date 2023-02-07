import axios from "axios";

const ENDPOINT = 'https://pixabay.com/api';
const KEY = '33419599-8df6ee82ed12cd9ffb5884c17'


export default class NewsApi {
    constructor() {
        this.queryPage = 1;
        this.searchQuery = '';
    }
     fetchPhoto(photo) {
    return axios.get(`${ENDPOINT}/?key=${KEY}&q=${photo}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.queryPage}`)
        .then((res) => res.data)
        .then((data) => { this.queryPage += 1; return data });
};
}



export { fetchPhoto };