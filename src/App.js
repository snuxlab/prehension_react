import React, { useState, useEffect } from 'react';
import './App.css';
import useInterval from './useInterval.js';



function App() {
  let [data, setData] = useState([]);
  const [time, setTime] = useState(new Date()); 
  const [curRoom, setCurRoom]  = useState("Room1");
  const [dataFl, setDataFl] = useState(data.s1_fl);
  const [dataMl, setDataMl] = useState(data.s1_ml);
   
  useEffect(() => {
    const timer = setTimeout(setTime(new Date(), 10000));
    return () => { clearTimeout(timer) };
  }, []);


  //초기 데이터 fetch
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api').then(response => 
      response.json().then(data => {
        setData(data);
      })
    );
  },[]);

  // 10초마다 data reload
  useInterval(() => {
    fetch('http://127.0.0.1:5000/api').then(response => 
      response.json().then(data => {
        setData(data);
      })
    );
    console.log('DataFeched');
  }, 10000);

  //curRoom, data가 바뀌면 ui update
  useEffect(() => {
    if (curRoom === "Room1"){
      setDataFl(data.s1_fl);  setDataMl(data.s1_ml);
      } 
    else if (curRoom === "Room2"){
      setDataFl(data.s2_fl);  setDataMl(data.s2_ml);
      }
  },[curRoom,data]);
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>
        {time.toLocaleString()} <br></br>
        {curRoom}<br></br>
        {dataFl}<br></br>
        {dataMl}
        </h1>
        <div>
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