import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Box, } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import RoomNavigator from './RoomNavigator';
import NopIcon from './NopIcon';



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
  tabs: {
    backgroundColor : "white",
    padding : theme.spacing(1),
    
  },
  indicator: {
    backgroundColor: "white"
  },
  tab:{
    color : "black",
    textTransform: 'none',
    fontWeight : 'fontWeightBold'
  },
  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "black"
  },
  nopviewer:{
    borderRadius : 12,
    display : "flex",
    flexDirection : "column",
    width : "85%",
    height : 300,
    justifyContent : "center",
    border : `2px solid #f1f1f1`,
    margin : "auto"
  },
  predict : {
    height : 50,
    padding : 10
  }
}));



export default function NavTabs({roomdata, nop}) {
  const theme = useTheme();
  const classes = useStyles();
  
  const [value, setValue] = React.useState(0);
  const [curRoom, setCurRoom] = useState(10);
  const [appIcon, setAppIcon] = useState("Loading data...");
  const [roomName, setRoomName] = useState("");
  const [text, setText] = useState("");
  
  
  
  
  


  
  useEffect(()=>{

    const nameOfRoom = (roomid) =>{
      return (roomdata.filter(item => item.id === roomid)[0].name);
    }

    //데이터 Fetch 이후
    if(nop[0]){
      if (curRoom === 10 || curRoom === 12){
        appicon(parseInt(nop.filter((item)=> parseInt(item.id) === curRoom)[0].nop));
        setRoomName(roomdata.filter((item) => (item.id === curRoom))[0].floor +"층 "+ nameOfRoom(curRoom));
      } else {
        setAppIcon("data dose not exist.");
        setText("");
        setRoomName("");
      }
    }
  },[curRoom, nop, roomdata]);



  

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
        setText("");
    }
  }


  return (
    
    <div className={classes.root}>
      <AppBar position="static" elevation={1}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs"
          className = {classes.tabs}
          TabIndicatorProps={{style: {background:'white'}}}
        >
          <LinkTab className={classes.tab} label="Share Circle" href="/drafts" {...a11yProps(0)} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction} width='100%' justifyContent='center'>
          <Box className = {classes.nopviewer} > 
            <Box alignItems="flex-start" p={1}> {roomName} </Box>
            <Box p={1}> {appIcon} </Box>
            {text}
          </Box> 
          
          <RoomNavigator setCurRoom={setCurRoom} curRoom={curRoom} roomdata={roomdata}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}