import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//useless

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/water_level/')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartData = data.map(entry => ({
    x: new Date(entry.timestamp).getTime(), // Convert to Unix timestamp
    y: entry.water_level
  }));

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Water Level over Time'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Timestamp'
      }
    },
    yAxis: {
      title: {
        text: 'Water Level'
      }
    },
    series: [{
      name: 'Water Level',
      data: chartData
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
