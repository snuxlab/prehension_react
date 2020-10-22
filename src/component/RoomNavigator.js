import React, { useEffect, useState } from 'react';
import {Box, Paper} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      width : '100%',
      flexWrap: 'wrap',
    },
}));

  
const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      fontSize: 10,
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
      
    },
}))(ToggleButtonGroup);  



function RoomNavigator({curRoom, setCurRoom}){
    

    const classes = useStyles();


    const handleRoom = (event, newRoomId) => { 
      setCurRoom(newRoomId);      
    };


    
    return(
        <p>
            <Box  display="flex" p={2} justifyContent="center" >
                <Paper elevation={0} className={classes.paper} >
                    <StyledToggleButtonGroup exclusive  onChange={handleRoom} aria-label = "room button group">
                        <ToggleButton selected = {(curRoom ===10)} value={10} orientation = 'vertical'><span>1층</span><br></br><span>리빙랩</span></ToggleButton>
                        <ToggleButton selected = {(curRoom ===12)} value={12}>1층 공용주방</ToggleButton>
                        <ToggleButton selected = {(curRoom ===11)} value={11}>1층 택배보관실</ToggleButton>
                        <ToggleButton selected = {(curRoom ===60)} value={60}>6층 회의실</ToggleButton>
                        <ToggleButton selected = {(curRoom ===63)} value={63}>6층 살롱</ToggleButton>
                    </StyledToggleButtonGroup>
                </Paper>        
            </Box>
        </p>
    );

}

export default RoomNavigator;