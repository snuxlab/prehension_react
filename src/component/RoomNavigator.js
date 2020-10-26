import React from 'react';
import {Box, Paper} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    width : "90%",
    border: `2px solid #f1f1f1`,
    flexWrap: 'wrap',
    marginTop : 30,
    justifyContent : "center",
    borderRadius : 12
  },

  
  
  
}));

  
const StyledToggleButtonGroup = withStyles((theme) => ({
  root : {
    display : 'flex',
    width : '100%',
    justifyContent : 'center'
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
    
  const classes = useStyles();

  const handleRoom = (event, newRoomId) => { 
    setCurRoom(newRoomId);      
  };


    
    return(
            <Box  display="flex" justifyContent="center" >
              <Paper className = {classes.paper} elevation={0}>
                    <StyledToggleButtonGroup exclusive  onChange={handleRoom} aria-label = "room button group">
                        <ToggleButton selected = {(curRoom ===10)} value={10} flexGrow={1} ><div><span>1층</span><br></br><div>리빙랩</div></div></ToggleButton>
                        <ToggleButton selected = {(curRoom ===12)} value={12} flexGrow={1} ><div><span>1층</span><br></br><div>공용주방</div></div></ToggleButton>
                        <ToggleButton selected = {(curRoom ===11)} value={11} flexGrow={1}><div><span>1층</span><br></br><div>택배 보관실</div></div></ToggleButton>
                        <ToggleButton selected = {(curRoom ===60)} value={60} flexGrow={1}><div><span>6층</span><br></br><div>회의실</div></div></ToggleButton>
                        <ToggleButton selected = {(curRoom ===63)} value={63} flexGrow={1}><div><span>6층</span><br></br><div>살롱</div></div></ToggleButton>
                    </StyledToggleButtonGroup>   
              </Paper> 
            </Box>
    );

}

export default RoomNavigator;