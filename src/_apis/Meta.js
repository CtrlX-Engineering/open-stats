import { diseaseShEnv } from '../shared/Environment';

/**
 * get the list of countries
 * @returns {promise<conutries>} 
*/
const getCountries = async () => {
  return await fetch(`${diseaseShEnv.baseUri}/countries`)
  .then((response) => response.json())
};

export { getCountries };
