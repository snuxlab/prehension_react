import React, { useState, useEffect } from 'react';
import './App.css';
import useInterval from './useInterval.js';





function App() {
  let [data, setData] = useState([])
  const [time, setTime] = useState(new Date()); 
  const [curRoom, setCurRoom]  = useState("Room1");
  const [dataFl, setDataFl] = useState(data.s1_fl);
  const [dataMl, setDataMl] = useState(data.s1_ml);


   
  useEffect(() => {
    const timer = setTimeout(setTime(new Date(), 10000));
    return () => { clearTimeout(timer) };
  }, []);


  useEffect(() => {
    fetch('http://127.0.0.1:5000/api').then(response => 
      response.json().then(data => {
        setData(data);
      })
    );
  },[]);

  // 10초마다 finaldata 리프레시
  useInterval(() => {
    fetch('http://127.0.0.1:5000/api').then(response => 
      response.json().then(data => {
        setData(data);
      })
    );
    console.log('DataFeched');
    curRoomRender(curRoom);
  }, 10000);

  //curRoom이 바뀌면 ui 바꾸기
  function curRoomRender(room) {
    setCurRoom(room);
    if (room === "Room1"){
      setDataFl(data.s1_fl);  setDataMl(data.s1_ml);
    } else if (room === "Room2"){
      setDataFl(data.s2_fl);  setDataMl(data.s2_ml);
    }
    
  } 
  

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
            
            <button value = "Room1" onClick = {({target :  {value}}) => curRoomRender(value)}>Room1</button>
            <button value = "Room2" onClick = {({target :  {value}}) => curRoomRender(value)}>Room2</button>
        </div>
        <p>
          테스트 하기
        </p>
      </header>
    </div>
  );
}

export default App;