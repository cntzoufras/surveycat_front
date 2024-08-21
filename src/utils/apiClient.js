import axiosInstance from './api/base/axios';
import appConfigApi from './api/appConfigApi';
import covidApi from './api/covidApi';
import todoApi from './api/todoApi';
import surveyApi from './api/surveyApi';
import pokemonApi from './api/pokemonApi';

const api = {
  client: axiosInstance,
  appConfig: appConfigApi,
  covid: covidApi,
  todo: todoApi,
  survey: surveyApi,
  pokemon: pokemonApi,
};

export default api;
