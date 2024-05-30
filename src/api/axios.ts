import axios from 'axios';

export const serverUrl = 'https://dev.flixforge.com/p/test_movies.pl'
export const axiosInstance = axios.create({
  baseURL: serverUrl,
  headers: {
      Authorization: 'Bearer SecretPass'
  },
});
