import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { RiDeleteBin6Line, RiRefreshLine } from 'react-icons/ri'; // Import delete and refresh icons from react-icons

const BarGraph = () => {
  const [data, setData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

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
      const categories = ['Home Use', 'School Use', 'Commercial Use'];
      const homeUseData = [];
      const schoolUseData = [];
      const commercialUseData = [];

      data.forEach(item => {
        const waterLevel = parseFloat(item.water_level);
        if (waterLevel < 50) {
          homeUseData.push(waterLevel);
          schoolUseData.push(null); // Null for school use if not applicable
          commercialUseData.push(null); // Null for commercial use if not applicable
        } else if (waterLevel <= 200) {
          homeUseData.push(null); // Null for home use if not applicable
          schoolUseData.push(waterLevel);
          commercialUseData.push(null); // Null for commercial use if not applicable
        } else {
          homeUseData.push(null); // Null for home use if not applicable
          schoolUseData.push(null); // Null for school use if not applicable
          commercialUseData.push(waterLevel);
        }
      });

      setSeriesData([
        {
          name: 'Home Use',
          data: homeUseData
        },
        {
          name: 'School Use',
          data: schoolUseData
        },
        {
          name: 'Commercial Use',
          data: commercialUseData
        }
      
      ]);
    };

    processChartData();
  }, [data]);

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
    }, 5000);
    
    return () => clearTimeout(timeout); // Cleanup function to clear the timeout
  }, []);

  const options = {
    chart: {
      backgroundColor: 'rgba(0,0,0,0)', // Transparent background
      height:'600px'
    },
    title: {
      text: 'Water Usage by Type'
    },
    xAxis: {
        title: {
          text: 'Day',
          style: {
            fontWeight: 'bolder',
            fontSize: '20px',
            letterSpacing: '3px',
          }
        }
      },
    yAxis: {
      title: {
        text: 'Water Usage Daily',
        style: {
          fontWeight: 'bolder',
          fontSize: '20px',
          letterSpacing: '3px',
        }
      }
      
    },
    series: seriesData
  };

  return (
    <div>
  
      <HighchartsReact highcharts={Highcharts} options={options} />
      <button style={{marginTop: '-600px', marginLeft: '70px', position: 'fixed', height: '40px', width: '40px'}} onClick={handleDeleteData}><RiDeleteBin6Line /></button>
      <button style={{marginTop: '-600px', marginLeft: '120px',position: 'fixed', height: '40px', width: '40px'}} onClick={fetchData}><RiRefreshLine /></button>
    </div>
  );
};

export default BarGraph;