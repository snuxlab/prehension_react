import React, { useEffect, useState } from 'react';
import {Box, Paper} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import RoomButtonGroup from './RoomButtonGroup';


const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      width : "85%",
      border: `2px solid #f1f1f1`,
      flexWrap: 'wrap',
      marginTop : 30,
      justifyContent : "center",
      borderRadius : 12
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
    
}));

// 커스텀 토글 버튼 그룹 
const StyledToggleButtonGroup = withStyles((theme) => ({
    
    grouped: {
      margin: theme.spacing(0.5),
      minWidth : 36,
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: 8,
      },
      '&:first-child': {
        borderRadius: 8,
      },
      
    },
}))(ToggleButtonGroup);  



function RoomNavigator({roomdata, curRoom, setCurRoom}){

    const [curFloor, setCurFloor] = useState("1");
    const [curJsonArr, setCurJsonArr] = useState(roomdata.filter(item => ((item.floor) === "1") ));
    

    const classes = useStyles();


    const handleFloor = (event, newFloor) => { 
      setCurFloor(newFloor);
      setCurJsonArr(roomdata.filter(item => ((item.floor) === newFloor) )); 
      //setCurRoom(floor(newFloor)*10);
      
    };

    const floor =(floorInString) =>{
      if (floorInString === "B1"){return 0;}
        else {return (parseInt(floorInString)); }
    }


    useEffect(()=>{
        setCurRoom(curRoom);  
    }
    ,[curRoom, setCurRoom]);


    
    return(
       <Box display="flex" flexDirection="column">
            <Box  display="flex"  justifyContent="center" >
                <Paper elevation={0} className={classes.paper} >
                    <StyledToggleButtonGroup exclusive  onChange={handleFloor} aria-label = "floor button group">
                        <ToggleButton selected = {(curFloor==="B1")} value={"B1"}>B1</ToggleButton>
                        <ToggleButton selected = {(curFloor==="1")} value={"1"}>1</ToggleButton>
                        <ToggleButton selected = {(curFloor==="2")} value={"2"}>2</ToggleButton>
                        <ToggleButton selected = {(curFloor==="3")} value={"3"}>3</ToggleButton>
                        <ToggleButton selected = {(curFloor==="4")} value={"4"}>4</ToggleButton>
                        <ToggleButton selected = {(curFloor==="5")} value={"5"}>5</ToggleButton>
                        <ToggleButton selected = {(curFloor==="6")} value={"6"}>6</ToggleButton>
                    </StyledToggleButtonGroup>
                </Paper>        
            </Box>
            <RoomButtonGroup array={curJsonArr} setCurFloor={setCurFloor} curFloor={floor(curFloor)} setCurRoom={setCurRoom} curRoom={curRoom}></RoomButtonGroup>
      </Box>  
    );

}

export default RoomNavigator;