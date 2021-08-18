import axios from 'axios';

/* eslint no-useless-catch: "error" */

export default {
  getList: function (s, page) {
    let url;
    if ((page != null) & (page > 1)) {
      url = `http://www.omdbapi.com/?apikey=faf7e5bb&s=${s}&page=${page}`;
    } else {
      url = `http://www.omdbapi.com/?apikey=faf7e5bb&s=${s}`;
    }
    const response = axios.get(url);
    return response;
  },
  getDetail: function (id) {
    const response = axios.get(`http://www.omdbapi.com/?apikey=faf7e5bb&i=${id}`);
    return response;
  },
};
