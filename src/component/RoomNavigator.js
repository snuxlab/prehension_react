import React, {useState} from 'react';
import {Box, Paper} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import RoomButtonGroup from './RoomButtonGroup';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    backgroundColor : '#f1f1f1',
    flexWrap: 'wrap',
    variant : 'outlined'
  },
}));

  
const StyledToggleButtonGroup = withStyles((theme) => ({
  root : {
    display : 'flex',
    width : '100%'
  },
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
  const [curFloor, setCurFloor] = useState("1");
  const [array, setArray] = useState("");
    
  const classes = useStyles();

  const handleFloor = (event, newFloor) => { 
    setCurRoom(newRoomId);      
  };


    
  return(
    <Box  display="flex" p={2} justifyContent="center" >
      <Paper className = {classes.paper} elevation={0}>
        <StyledToggleButtonGroup exclusive  onChange={handleRoom} aria-label = "room button group">
            <ToggleButton selected = {(curRoom ===10)} value={10} ><div><span>1층</span><br></br><div>리빙랩</div></div></ToggleButton>
            <ToggleButton selected = {(curRoom ===12)} value={12} ><div><span>1층</span><br></br><div>공용주방</div></div></ToggleButton>
            <ToggleButton selected = {(curRoom ===11)} value={11} ><div><span>1층</span><br></br><div>택배 보관실</div></div></ToggleButton>
            <ToggleButton selected = {(curRoom ===60)} value={60} ><div><span>6층</span><br></br><div>회의실</div></div></ToggleButton>
            <ToggleButton selected = {(curRoom ===63)} value={63} ><div><span>6층</span><br></br><div>살롱</div></div></ToggleButton>
        </StyledToggleButtonGroup>   
      </Paper> 
      <RoomButtonGroup curRoom= {curRoom} setCurRoom={setCurRoom} curFloor={curFloor} />
    </Box>
    );

}

export default RoomNavigator;