import axiosInstance from './api/base/axios';
import appConfigApi from './api/appConfigApi';
import covidApi from './api/covidApi';
import todoApi from './api/todoApi';
import pokemonApi from './api/pokemonApi';

const api = {
  client: axiosInstance,
  appConfig: appConfigApi,
  covid: covidApi,
  todo: todoApi,
  pokemon: pokemonApi,
};

export default api;
