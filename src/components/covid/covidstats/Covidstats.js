import StatCard from "../../statCard/StatCard";
import { getCovidStats } from "../../../_apis/CovidData";
import "./Covidstats.css";
import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { getCountries } from "../../../_apis/Meta";
import { META_STRINGS, COVID_DATA_CLASS_TYPE } from "../../../shared/Constants";
import Chart from "../chart/Chart";

function Covidstats(props) {
  const [stats, setStats] = useState("");
  const [countries, setCountries] = useState([]);
  const [currentValue, setCurrentValue] = useState("Worldwide");
  const [classType, setClassType] = useState(COVID_DATA_CLASS_TYPE.CASES);

  useEffect(() => {
    getCountries().then((data) => {
      const outcome = data.map((item) => [
        {
          name: item.country,
          value: item.countryInfo.iso2,
        },
      ]);
      setCountries(outcome);
      getCovidStats(currentValue).then((data) => {
        setStats(data);
      });
    });
  }, []);

  const handleChange = async (event) => {
    setCurrentValue(event.target.value);
    const stats = await getCovidStats(event.target.value);
    setStats(stats);
  };

  return (
    <div>
      {/*ToDo: Move the header to another component*/}
      <div className="app-header">
        <h1>COVID-19</h1>
        <FormControl className="app-dropdown">
          <InputLabel id="demo-simple-select-autowidth-label">
            Location
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={currentValue}
            autoWidth
            onChange={handleChange}
          >
            <MenuItem value="Worldwide">
              World Wide
            </MenuItem>
            {countries.map((country) => (
              <MenuItem value={country[0].value}>{country[0].name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/*-----------------------------------------------------------------------------------*/}

      <div className="home-statCards">
        <StatCard onClick={(event) => setClassType(COVID_DATA_CLASS_TYPE.CASES)} title="Today's Coronavirus Cases" cases={stats.todayCases} total={`${stats.cases} Total`} />
        <StatCard onClick={(event) => setClassType(COVID_DATA_CLASS_TYPE.RECOVERED)} title="Today's Recovered" cases={stats.todayRecovered} total={`${stats.recovered} Total`} />
        <StatCard onClick={(event) => setClassType(COVID_DATA_CLASS_TYPE.DEATHS)} title="Today's Deaths" cases={stats.deaths} total={`${stats.todayDeaths} Total`} />
      </div>

       {/*-----------------------------------------------------------------------------------*/}

      <div className="home-statChart">
        <Chart countryCode={currentValue} ></Chart>
      </div>
    </div>
  );
}

export default Covidstats;
