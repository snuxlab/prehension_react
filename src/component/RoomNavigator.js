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
      backgroundColor: 'white',
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
        
    };

    useEffect(()=>{
        props.setCurRoom(curRoom);
        
    }
    ,[curRoom]);


    
    return(
        <p>
            <Box  display="flex" p={2} bgcolor="white" justifyContent="center">
                <Paper elevation={0} className={classes.paper}>
                    <StyledToggleButtonGroup exclusive onChange={handleFloor} aria-label = "floor button group">
                        <ToggleButton value={"B1"}>B1</ToggleButton>
                        <ToggleButton value={"1"}>1</ToggleButton>
                        <ToggleButton value={"2"}>2</ToggleButton>
                        <ToggleButton value={"3"}>3</ToggleButton>
                        <ToggleButton value={"4"}>4</ToggleButton>
                        <ToggleButton value={"5"}>5</ToggleButton>
                        <ToggleButton value={"6"}>6</ToggleButton>
                    </StyledToggleButtonGroup>
                </Paper>        
            </Box>
            <RoomButtonGroup array={curJsonArr} floor={setCurFloor} setCurRoom={setCurRoom}></RoomButtonGroup>
        </p>
    );

}

export default RoomNavigator;