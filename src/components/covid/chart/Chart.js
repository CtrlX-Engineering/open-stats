import "./Chart.css";
import React, { useEffect } from "react";
import { getHistoricalData } from "../../../_apis/CovidData";
import { META_STRINGS } from "../../../shared/Constants";
import { Line } from "react-chartjs-2";
import { chartOptions, prepChartData } from './Helper'

function Chart(props) {
  const [chartData, setChartData] = React.useState([]);

  useEffect(() => {
    const isWorldWide = props.countryCode === META_STRINGS.WORLD_WIDE;
    console.log(props.countryCode);
    const apiCall = async () => {getHistoricalData(props.countryCode, 30).then((data) => {
      setChartData(prepChartData(isWorldWide ? data : data.timeline, "cases"));
      });
    }
    apiCall();
  }, [props.caseType, props.countryCode]);

  return (
    <div className="chart">
      {chartData?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: 'Total Number of cases in last 30 days',
                fill: true,
                backgroundColor: "rgba(247, 32, 32, 0.5)",
                borderColor: "#CC1034",
                data: chartData,
              },
            ],
          }}
          options={ chartOptions(chartData) }
        />
      )}
    </div>
  );
}

export default Chart;
