import React, { useState, useEffect } from 'react';
import './App.css';
import useInterval from './useInterval.js';
import NavTabs from './component/NavTabs'
import roomData from './roomData.json';


function App() {
  const [data, setData] = useState([]);

  //초기 데이터 fetch
  useEffect(() => { 
    async function fetching () {
      const temp = await fetch('https://prehensionapi.herokuapp.com/api').then(response => response.json());
      setData(temp);
    }
    fetching();
  },[]);

  
  // 10초마다 data reload
  useInterval(() => {
    fetch('https://prehensionapi.herokuapp.com/api').then(response => 
      response.json().then(data => {
        setData(data);
      })
    );
    console.log('DataFeched');
  }, 10000);
  


  return (
    <div className="App">
      <NavTabs roomdata={roomData} nop={data} />
    </div>
  );
}

export default App;