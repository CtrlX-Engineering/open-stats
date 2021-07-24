import { diseaseShEnv } from "../shared/Environment";
import { META_STRINGS } from "../shared/Constants";

/**
 * Get COVID-19 totals for a specific country
 * @param {string} countryCode
 * @returns {Promise<covidStats>} covid stats object
 */
const getCovidStats = async (countryCode) => {
  return await fetch(
    `${diseaseShEnv.baseUri}/${
      countryCode === META_STRINGS.WORLD_WIDE
        ? "all"
        : `countries/${countryCode}`
    }`
  ).then((response) => response.json());
};

/**
 * Get COVID-19 historical data for a specific country and last days by daysCount param
 * @param {string} countryCode
 * @param {number} daysCount default is 30
 * @returns {Promise<historicalData>} covid stats object
 */
const getHistoricalData = async (countryCode, daysCount = 30) => {
  const isWorldWide = countryCode === META_STRINGS.WORLD_WIDE;
  return await fetch(
    `${diseaseShEnv.baseUri}/${
      isWorldWide
        ? `historical/all?lastdays=${daysCount}`
        : `historical/${countryCode}?lastdays=${daysCount}`
    }`
  ).then((response) =>
    response.json()
  );
};

export { getCovidStats, getHistoricalData };
