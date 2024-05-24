import React, { useState } from 'react';
import AnotherChart from './linegraph';
import BarGraph from './bargraph';
import LineGraph from './rate';

const App = () => {
  const [chartType, setChartType] = useState(null);

  const handleButtonClick = (type) => {
    setChartType(type);
  };

  return (
    <div style={{ width: '1000px', height: '800px', marginLeft: '400px', marginTop: '100px' }}>
      <div style={{ marginLeft: '250px', marginTop: '100px', marginBottom: '50px' }}>
        <h1 style={{ color: '#074173', fontWeight: '700' }}>Welcome to Kapatagan Water District</h1>
      </div>
      <div>
        <button onClick={() => handleButtonClick('weeklyUsage')} style={{ padding: '20px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#22D3EE', color: '#000000',fontWeight:'bold', border: 'none', cursor: 'pointer', marginLeft: '105px',position:'fixed' }}>Monthly Water Level</button>
        <button onClick={() => handleButtonClick('numberOfUses')} style={{ padding: '20px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#22D3EE', color: '#000000',fontWeight:'bold', border: 'none', cursor: 'pointer', marginLeft: '470px',position:'fixed' }}>Usage Monitoring</button>
        <button onClick={() => handleButtonClick('waterRate')} style={{ padding: '20px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#22D3EE', color: '#000000',fontWeight:'bold', border: 'none', cursor: 'pointer', marginLeft: '805px',position:'fixed' }}>Water Rate Monitoring </button>
        <div  style={{ width: '1000px', height: '900px', marginLeft: '60px', marginTop: '100px', position:'fixed'}}>
          {chartType === 'numberOfUses' && <BarGraph />}
        {chartType === 'weeklyUsage' && <AnotherChart />}
        {chartType === 'waterRate' && <LineGraph />}
        </div>
      </div>
    </div>
  );
};

export default App;
