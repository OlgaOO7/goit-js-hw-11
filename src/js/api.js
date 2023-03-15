// import { showErrorNotFound } from './showErrorType';
import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "34260736-34eeaa34875fe4dc0dfd398f9";

export class ImagesApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async getImages() {
    try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}`, {
        params: {
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: this.page,
          per_page: 40,
        }
      }).then ()
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      
    }
  }

  incrementPage() {
    this.page += 1;
  };

  resetPage() {
    this.page = 1;
  }

  // get query() {
  //   return this.searchQuery;
  // };

  // set query(newQuery) {
  //   this.searchQuery = newQuery;
  // };
};