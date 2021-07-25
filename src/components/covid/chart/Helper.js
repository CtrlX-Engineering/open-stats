import numeral from "numeral";

const chartOptions = (chartData) => {
  return {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, chartData) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
};

/**
 * Prepare the dataset into chartjs line chart format
 * @param {array} data
 * @param {string} classType
 * @returns array
 */
const prepChartData = (data, classType) => {
  const chartData = [];
  for (var date in data[classType]) {
    const chartFormat = {
      x: date,
      y: data[classType][date],
    };
    chartData.push(chartFormat);
  }
  return chartData;
};

export { chartOptions, prepChartData };
