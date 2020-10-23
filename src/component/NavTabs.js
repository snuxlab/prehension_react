import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab,  Box, Grid, Paper} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import RoomNavigator from './RoomNavigator'
import FavCard from './FavCard';
import {ToggleButton} from '@material-ui/lab';
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import NopIcon from './NopIcon';

//reload 되기 직전 함수 콜
const useWindowUnloadEffect = (handler, callOnCleanup) => {
  const cb = useRef()
  cb.current = handler
  
  useEffect(() => {
    const handler = () => cb.current()
    window.addEventListener('beforeunload', handler)
    return () => {
      if(callOnCleanup) handler()
      window.removeEventListener('beforeunload', handler)
    }
  }, [cb])
}



//탭에 종속 되는 패널 생성
function TabPanel(props) {
  const { children, value, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}


//탭 패널 스타일
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'grey.300',
  },
  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  fav:{
    border: 'none'
  },
  predict : {
    height : 50,
    padding : 10
  }
}));







const savedData =() =>{
  let newArr = [];
  for (var i=0; i<localStorage.length; i++){
    const newId = localStorage.key(i);
    newArr[newArr.length] = parseInt(newId);
  }
  return newArr;
}


export default function NavTabs({roomdata, nop}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [curRoom, setCurRoom] = useState(10);
  const [appIcon, setAppIcon] = useState("Loading data...");
  const [roomName, setRoomName] = useState("");
  const [text, setText] = useState("");
  const [curFav, setCurFav] = useState(false);
  const [curFavIcon, setCurFavIcon] = useState();

  const [favArr, setFavArr] = useState(savedData());
  
  


  const nameOfRoom = (roomid) =>{
    return (roomdata.filter(item => item.id === roomid)[0].name);
  }
  


  //리프레시시에, 현재 favArr의 item들 저장
  useWindowUnloadEffect(() => {
    localStorage.clear();
    for(var i = 0; i < favArr.length; i++){
      localStorage.setItem(favArr[i], i);
    }
    console.log("data saved in localStorage")
  }, true);

  


  //초기 벨류 설정
  useEffect(() => {
    //언마운트시에 localStorage에 Arr 저장 
    return () => {
      localStorage.clear();
      for(var i = 0; i < favArr.length; i++){
        localStorage.setItem(favArr[i], i);
      }
    }
  }); 



  useEffect(()=>{
    setRoomName(roomdata.filter((item) => (item.id === curRoom))[0].floor +"층 "+ nameOfRoom(curRoom));
    setCurFav(favArr.indexOf(curRoom) !== -1);

    if(nop[0]){
      if (curRoom === 10 || curRoom === 12){
        appicon(parseInt(nop.filter((item)=> parseInt(item.id) === curRoom)[0].nop));
      } else {
        setAppIcon("data dose not exist.");
        setText("");
      }
    }
  },[curRoom, nop, roomdata]);

  useEffect(()=> {
    if (curFav) {
      setCurFavIcon(<Favorite/>); 
      //length가 마지막 아이템의 index가 되도록 설정
      if(favArr.indexOf(curRoom) === -1){
        setFavArr(favArr.concat(curRoom));
      }
    }
    else {
      setCurFavIcon(<FavoriteBorder/>);
      if(favArr.indexOf(curRoom) !== -1){
        console.log("removed");
        setFavArr(favArr.filter(item => item !== curRoom));
        
      }
    }
  },[curFav]);




  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  


  const appicon = (roomstate) => {
    switch (roomstate) {
      case 0 : 
        setAppIcon(NopIcon(0));
        setText("0명");
        break;
      case 1:
        setAppIcon(NopIcon(1));
        setText("1명");
        break;
      case 2 :
        setAppIcon(NopIcon(2));
        setText("2명 이상");
        break;
      default : 
        break;
    }
  }


  return (
    
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs"
        >
          <LinkTab label="홈" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="즐겨찾기" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box m='auto' flexDirection="column" width = '85%' height={300} boxShadow={2} display='flex' justifyContent='center' alignItems='center'> 
            <Box p={1}> {roomName} </Box>

            {nop[0] && (curRoom === 10 || curRoom === 12) ? 
            <Grid container justify="center" spacing ={1}> 
              <Grid item >
                <Paper className={classes.predict}  >1h</Paper>
              </Grid>
              <Grid item >
                <Paper className={classes.predict}  >2h</Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.predict}  >3h</Paper>
              </Grid>
            </Grid> : <span></span>}

            <Box p={1}> {appIcon} </Box>
            {text}

            <Box width='80%' display='flex' flexDirection="row-reverse">
              <ToggleButton className={classes.fav} onChange={() => {setCurFav(!curFav);}}>{curFavIcon}</ToggleButton>
            </Box> 

          </Box> 
          
          <RoomNavigator setCurRoom={setCurRoom} curRoom={curRoom} roomdata={roomdata}/>
        </TabPanel>
        <TabPanel  value={value} index={1} dir={theme.direction}>
          
          {favArr.map(numid => 
            <FavCard key={numid} id={numid} name={nameOfRoom(numid)}/>
          )}
          
        </TabPanel>
      </SwipeableViews>
    </div>
   
  );
}