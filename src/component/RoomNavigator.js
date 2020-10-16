import React, { useEffect, useState } from 'react';
import {Box, Paper} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import RoomButtonGroup from './RoomButtonGroup';


const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: 'wrap',
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
    
}));

  
const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),

      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
      
    },
}))(ToggleButtonGroup);  



function RoomNavigator(props){

    const [curFloor, setCurFloor] = useState("1");
    const [curJsonArr, setCurJsonArr] = useState(props.data.filter(item => ((item.floor) === "1") ));
    const [curRoom, setCurRoom] = useState(props.curRoom);
    

    const classes = useStyles();


    const handleFloor = (event, newFloor) => { 
      setCurFloor(newFloor);
      setCurJsonArr(props.data.filter(item => ((item.floor) === newFloor) )); 
      /*setCurRoom(() => {
        if (newFloor === "B1"){return 0;}
        else {return (parseInt(newFloor)*10); }
      });*/
      
    };

    const floor =(floorInString) =>{
      if (floorInString === "B1"){return 0;}
        else {return (parseInt(floorInString)); }
    }


    useEffect(()=>{
        props.setCurRoom(curRoom);  
    }
    ,[curRoom]);


    
    return(
        <p>
            <Box  display="flex" p={2} justifyContent="center" >
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
        </p>
    );

}

export default RoomNavigator;