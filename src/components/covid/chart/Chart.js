import './Chart.css';
import React, { useEffect } from 'react';
import { getHistoricalData } from '../../../_apis/CovidData';
import { META_STRINGS } from '../../../shared/Constants';

function Chart(props) {
    const prepChartData = (data, classType) => {
        const chartData = [];
        for(var date in data[classType]) {
            const chartFormat = {
                x: date,
                y: data[classType][date]
            }
            chartData.push(chartFormat);
        }
        return chartData;
    }

    const [chartData, setChartData] = React.useState([]);

    useEffect(() => {
        const isWorldWide = props.countryCode === META_STRINGS.WORLD_WIDE;
        console.log(props.countryCode);
        getHistoricalData(props.countryCode, 30).then((data) => {
            console.log(data);
            setChartData(prepChartData(isWorldWide ? data : data.timeline, 'cases'));
            console.log(chartData);
        })
    }, [props.countryCode]);



    return(
        <div>

        </div>
    );
}

export default Chart;