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

    //층별 어레이 모듈화 하기
    const b1array = [{id : 0, name : "홈짐"},{id : 1,name : "홈트레이닝1"},{id : 2,name : "홈트레이닝2"}];
    const f1array = [{id : 10,name : "리빙랩"},{id : 11,name : "1층 공용주방"},{id : 12,name : "택배보관실"}];


    const [curFloor, setCurFloor] = useState("1");
    const [curJsonArr, setCurJsonArr] = useState(f1array);
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

    

    /*
    useEffect(()=>
    {
        switch (curFloor) {
            case "B1" : 
                setCurJsonArr(b1array);
                break;
            case "1" : 
                setCurJsonArr(f1array);
        }
            
    }, [curFloor]);*/
    
    return(
        <div>
            <Box display="flex" p={2} bgcolor="white" justifyContent="center">
                <Paper>
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
        </div>
    );

}

export default RoomNavigator;