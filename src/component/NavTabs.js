import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import RoomNavigator from './RoomNavigator'
import FavCard from './FavCard';
import {ToggleButton} from '@material-ui/lab';
import {Favorite, FavoriteBorder} from '@material-ui/icons';


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
          <Typography>{children}</Typography>
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
  }
}));



function PersonIcon (){
  return (
    <svg width="61" height="80" viewBox="0 0 61 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30.2 31C9.7 31 3 70.2 3 70.2C12.4 75.7 21.9 77.1 30.3 77.1C38.7 77.1 48.2 75.6 57.6 70.2C57.6 70.2 50.8 31 30.2 31Z" stroke="#A5A5A5" strokeWidth="5" strokeMiterlimit="10"/>
    <path d="M29.4001 35.6C38.4023 35.6 45.7001 28.3022 45.7001 19.3C45.7001 10.2978 38.4023 3 29.4001 3C20.3979 3 13.1001 10.2978 13.1001 19.3C13.1001 28.3022 20.3979 35.6 29.4001 35.6Z" fill="white" stroke="#A5A5A5" strokeWidth="5" strokeMiterlimit="10"/>
    </svg>
  );
}

function PeopleIcon (){
  return (
    <svg width="122" height="90" viewBox="0 0 122 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100.1 30.4C85.9999 30.4 81.3999 57.3 81.3999 57.3C87.7999 61.1 94.3999 62.1 100.1 62.1C105.9 62.1 112.4 61.1 118.8 57.3C118.8 57.4 114.2 30.4 100.1 30.4Z" stroke="#A5A5A5" strokeWidth="5" strokeMiterlimit="10"/>
    <path d="M99.4998 33.6C105.685 33.6 110.7 28.5856 110.7 22.4C110.7 16.2144 105.685 11.2 99.4998 11.2C93.3142 11.2 88.2998 16.2144 88.2998 22.4C88.2998 28.5856 93.3142 33.6 99.4998 33.6Z" fill="white" stroke="#A5A5A5" strokeWidth="5" strokeMiterlimit="10"/>
    <path d="M21.7 29.2C7.6 29.2 3 56.2 3 56.2C9.4 60 16 61 21.7 61C27.5 61 34 60 40.4 56.2C40.4 56.2 35.8 29.2 21.7 29.2Z" stroke="#A5A5A5" strokeWidth="5" strokeMiterlimit="10"/>
    <path d="M21.0999 32.4C27.2855 32.4 32.2999 27.3856 32.2999 21.2C32.2999 15.0144 27.2855 10 21.0999 10C14.9143 10 9.8999 15.0144 9.8999 21.2C9.8999 27.3856 14.9143 32.4 21.0999 32.4Z" fill="white" stroke="#A5A5A5" strokeWidth="5" strokeMiterlimit="10"/>
    <path d="M53 35.2C55.2 36.7 57.9 37.7 60.8 37.7C64 37.7 66.9 36.6 69.3 34.8C72.5 32.3 74.6 28.3 74.6 23.9C74.6 16.3 68.4 10.1 60.8 10.1C53.2 10.1 47 16.3 47 23.9C47.1 28.5 49.4 32.7 53 35.2Z" fill="white"/>
    <path d="M69.5002 40.5C66.9002 41.8 64.0002 42.6 60.9002 42.6C58.2002 42.6 55.6002 42 53.2002 41C48.5002 44.5 45.0002 50.6 42.6002 56C39.5002 63 37.8002 70.2 37.2002 73.4C44.4002 77.3 52.4002 79.1 61.7002 79.1C71.0002 79.1 79.0002 77.2 86.2002 73.4C85.5002 70.2 83.8002 63 80.7002 56C78.3002 50.4 74.6002 44 69.5002 40.5Z" fill="white"/>
    <path d="M61.6999 86.6C50.3999 86.6 40.6999 84.1 31.8999 79L28.8999 77.3L29.4999 73.9C29.8999 71.4 33.8999 50 45.0999 38.2C41.4999 34.3 39.4999 29.2 39.4999 23.8C39.4999 12 49.0999 2.5 60.7999 2.5C72.4999 2.5 82.1999 12.1 82.1999 23.8C82.1999 28.8 80.4999 33.5 77.3999 37.3C89.3999 48.8 93.4999 71.2 93.8999 73.8L94.4999 77.2L91.4999 78.9C82.6999 84.1 72.9999 86.6 61.6999 86.6ZM40.0999 72C46.4999 75.1 53.5999 76.6 61.6999 76.6C69.7999 76.6 76.8999 75.1 83.2999 72C82.4999 68.6 80.8999 62.7 78.3999 57C75.6999 50.8 72.4999 46.2 69.1999 43.4C66.5999 44.5 63.7999 45.1 60.8999 45.1C58.3999 45.1 55.9999 44.7 53.6999 43.8C50.4999 46.6 47.4999 51.1 44.9999 56.9C42.4999 62.7 40.8999 68.6 40.0999 72ZM60.8999 12.5C54.6999 12.5 49.5999 17.6 49.5999 23.8C49.5999 27.5 51.3999 31 54.4999 33.1C56.3999 34.4 58.5999 35.1 60.8999 35.1C63.3999 35.1 65.7999 34.3 67.8999 32.7C70.6999 30.5 72.2999 27.3 72.2999 23.8C72.1999 17.6 67.0999 12.5 60.8999 12.5Z" fill="#A5A5A5"/>
    <path d="M60.9001 5C71.3001 5 79.7001 13.4 79.7001 23.8C79.7001 29.2 77.4001 34 73.8001 37.4C86.8001 47.8 91.2001 72.9 91.4001 74.2L91.7001 75.9L90.2001 76.8C81.8001 81.7 72.5001 84.1 61.7001 84.1C50.9001 84.1 41.6001 81.7 33.2001 76.8L31.7001 76L32.0001 74.3C32.2001 72.9 36.4001 49 48.7001 38.2C44.6001 34.7 42.0001 29.6 42.0001 23.8C42.1001 13.4 50.5001 5 60.9001 5ZM60.9001 37.6C64.1001 37.6 67.0001 36.5 69.4001 34.7C72.6001 32.2 74.7001 28.2 74.7001 23.8C74.7001 16.2 68.5001 10 60.9001 10C53.3001 10 47.1001 16.2 47.1001 23.8C47.1001 28.5 49.5001 32.7 53.1001 35.2C55.3001 36.7 58.0001 37.6 60.9001 37.6ZM60.9001 42.6C58.2001 42.6 55.6001 42 53.2001 41C48.5001 44.5 45.0001 50.6 42.6001 56C39.5001 63 37.8001 70.2 37.2001 73.4C44.4001 77.3 52.4001 79.1 61.7001 79.1C70.9001 79.1 79.0001 77.2 86.2001 73.4C85.5001 70.2 83.8001 63 80.7001 56C78.2001 50.4 74.6001 44 69.5001 40.5C66.9001 41.9 64.0001 42.6 60.9001 42.6ZM60.9001 0C47.7001 0 37.1001 10.7 37.1001 23.8C37.1001 29 38.8001 34 41.9001 38.1C31.2001 50.7 27.4001 70.9 27.0001 73.4L26.7001 75.1L26.1001 78.5L29.1001 80.2L30.6001 81.1C39.8001 86.5 49.9001 89.1 61.7001 89.1C73.4001 89.1 83.6001 86.5 92.8001 81.1L94.3001 80.2L97.3001 78.5L96.7001 75.1L96.4001 73.4C96.0001 70.8 92.0001 49.5 80.7001 37.1C83.3001 33.2 84.7001 28.6 84.7001 23.8C84.7001 10.7 74.0001 0 60.9001 0ZM60.9001 32.6C59.1001 32.6 57.4001 32.1 55.9001 31C53.5001 29.3 52.1001 26.6 52.1001 23.7C52.1001 18.8 56.1001 14.9 60.9001 14.9C65.8001 14.9 69.7001 18.9 69.7001 23.7C69.7001 26.4 68.5001 28.9 66.3001 30.6C64.7001 32 62.8001 32.6 60.9001 32.6ZM60.9001 47.6C63.6001 47.6 66.2001 47.2 68.7001 46.3C71.4001 48.9 73.9001 52.8 76.1001 58C78.1001 62.6 79.5001 67.2 80.3001 70.6C74.7001 73 68.6001 74.1 61.6001 74.1C54.6001 74.1 48.5001 73 42.9001 70.6C43.8001 67.2 45.2001 62.6 47.1001 58C49.2001 53.1 51.6001 49.3 54.1001 46.7C56.4001 47.3 58.6001 47.6 60.9001 47.6Z" fill="white"/>
    </svg>
  )
}


export default function NavTabs({data}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [curRoom, setCurRoom] = useState(0);
  const [appIcon, setAppIcon] = useState();
  const [roomName, setRoomName] = useState("");
  const [text, setText] = useState("");
  const [curFav, setCurFav] = useState(false);
  const [curFavIcon, setCurFavIcon] = useState();

  const [favArr, setFavArr] = useState([]);


  const nameOfRoom = (roomid) =>{
    return (data.filter(item => item.id === roomid)[0].name);
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
    //추후에 로그인 혹은 쿠키 활성화시 가장 curRoom 세팅
    
    //처음 로딩시, localStorage에 있는 roomid favArr에 저장이 안된다... 왜지????? 왜???? plz..........
    for (var i=0; i<localStorage.length; i++){
      setFavArr(favArr.concat(parseInt(localStorage.key(i))));
    }

    console.log("data loaded from localStorage");

    //언마운트시에 localStorage에 Arr 저장 
    return () => {
      localStorage.clear();
      for(var i = 0; i < favArr.length; i++){
        localStorage.setItem(favArr[i], i);
      }
    }
  },[]); 



  useEffect(()=>{
    appicon(curRoom);
    setRoomName(data.filter((item) => (item.id === curRoom))[0].floor +"층 "+ nameOfRoom(curRoom));
    setCurFav(favArr.indexOf(curRoom) !== -1);
    console.log(favArr);


  },[curRoom]);

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
        setFavArr(favArr.filter(item => item != curRoom));
        
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
        setAppIcon(<PersonIcon/>);
        setText("1명");
        break;
      case 1:
        setAppIcon(<PeopleIcon />);
        setText("여러명");
        break;
      case 2 :
        setAppIcon(<PersonIcon />);
        setText("1명");
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
            {roomName}
            {appIcon}
            {text}
            <Box width='80%' display='flex' flexDirection="row-reverse">
              <ToggleButton className={classes.fav} onChange={() => {setCurFav(!curFav);}}>{curFavIcon}</ToggleButton>
            </Box>
          </Box>
          
          <RoomNavigator setCurRoom={setCurRoom} curRoom={curRoom} data={data}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {favArr.map(numid => 
            <FavCard key={numid} id={numid} name={nameOfRoom(numid)}/>
            )}
        </TabPanel>
      </SwipeableViews>
    </div>
   
  );
}