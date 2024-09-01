import axiosInstance from './api/base/axios';
import appConfigApi from './api/appConfigApi';
import pokemonApi from './api/pokemonApi';

const api = {
  client: axiosInstance,
  appConfig: appConfigApi,
  pokemon: pokemonApi,
};

export default api;
