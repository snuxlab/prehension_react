import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [finaldata, setFinaldata] = useState([])
  const [time, setTime] = useState(new Date()); 
  const [curRoom, setCurRoom]  = useState("defalut");


    
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
        <div>
            <h1>{curRoom}</h1>
            <button value = "Room1" onClick = {({target :  {value}}) => setCurRoom(value)}>Room1</button>
            <button value = "Room2" onClick = {({target :  {value}}) => setCurRoom(value)}>Room2</button>
        </div>
        <p>
          테스트 하기
        </p>
      </header>
    </div>
  );
}

export default App;