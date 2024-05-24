import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { RiDeleteBin6Line, RiRefreshLine } from 'react-icons/ri'; // Import delete and refresh icons from react-icons


const LineGraph = () => {
  const [data, setData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  const fetchData = () => {
    fetch('http://localhost:5000/api/water_level')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setShowGraph(true); // Show graph after fetching data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  useEffect(() => {
    const processChartData = () => {
      const newSeriesData = [];
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      for (let i = 0; i < data.length; i += 30) {
        const monthData = data.slice(i, i + 30).map((item, index) => ({
          x: i + index + 1, // Assign index 1-30 for each set of data
          y: parseFloat(item.water_level)/100
        }));

        const monthIndex = Math.floor(i / 30) % 12;
        newSeriesData.push({
          
          name: months[monthIndex],
          data: monthData
          
        });
      }

      setSeriesData(newSeriesData.reverse()); // Reverse to display newest data first
    };

    if (showGraph) {
      processChartData();
    }
  }, [data, showGraph]);

  const handleDeleteData = () => {
    fetch('http://localhost:5000/api/water_level', {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        // Handle successful deletion
        console.log('Data deleted:', data);
        // Fetch data again to refresh
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData(); // Fetch data again to refresh
    }, 1000);

    return () => clearTimeout(timeout); // Cleanup function to clear the timeout
  }, []);

  const options = {
    chart: {
      type: 'line',
      backgroundColor: 'rgba(0,0,0,0)' ,// Transparent background
      height:'600px',
    },
    title: {
      text: 'Php per Cubic Meter Monitor',
      style: {
        fontWeight: 'bolder',
        fontSize: '30px',
        letterSpacing: '1px',
      }
    },
    xAxis: {
      title: {
        text: 'Day'
        ,
        style: {
          fontWeight: 'bolder',
          fontSize: '20px',
          letterSpacing: '3px',
        }
      }
    },
    yAxis: {
      title: {
        text: 'Centavo per Cubic Meter' ,
        style: {
          fontWeight: 'bolder',
          fontSize: '20px',
          letterSpacing: '1px',
        }
      },
      min: 0, // Set minimum value of the y-axis
      max: 7, // Set maximum value of the y-axis
      tickInterval: 1 // Set interval between ticks
      },
    series: seriesData
  };

  return (
    <div>
     
      {showGraph && <HighchartsReact highcharts={Highcharts} options={options} />}
      <button style={{marginTop: '-600px', marginLeft: '70px', position: 'fixed', height: '40px', width: '40px'}} onClick={handleDeleteData}><RiDeleteBin6Line /></button>
      <button style={{marginTop: '-600px', marginLeft: '120px',position: 'fixed', height: '40px', width: '40px'}} onClick={fetchData}><RiRefreshLine /></button>
    </div>
  );
};

export default LineGraph;
