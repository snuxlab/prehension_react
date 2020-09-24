import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [finaldata, setFinaldata] = useState([])
  const [time, setTime] = useState(new Date()); 
    
  useEffect(() => {
    const timer = setTimeout(setTime(new Date(), 10000));
    return () => { clearTimeout(timer) };
  }, []);


  useEffect(() => {
    fetch('http://127.0.0.1:5000/api').then(response => 
      response.json().then(data => {
        setFinaldata(data);
      })
    );
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
        {time.toLocaleString()} <br></br>
        s1_fl
        {finaldata.s1_fl}<br></br>
        {finaldata.s1_ml}
        </h1>
        <p>
          테스트 하기
        </p>
      </header>
    </div>
  );
}

export default App;