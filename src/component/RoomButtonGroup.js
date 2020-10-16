import React, { useEffect, useState } from 'react';
import {IconButton} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import {Box} from '@material-ui/core';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';


function RoomButtonGroup(props){
    const [curIndex, setCurIndex] = useState(props.curRoom);
    const handleIndex = (event, newIndex) => {
        props.setCurRoom(newIndex);
        setCurIndex(newIndex);
    };

    

    return(
        
        
            <Box display='flex' p={1} justifyContent="center" bgcolor="white">
                
                    <IconButton onClick={()=>{ if(curIndex > props.curFloor *10) {setCurIndex(curIndex-1)}}}><ChevronLeft/></IconButton>
                    <ToggleButtonGroup exclusive onChange={handleIndex} aria-label = "room button group">
                        {props.array.map((item)=>
                        <ToggleButton selected ={(curIndex === item.id)} value={item.id} key={item.id}>{item.name} </ToggleButton>
                        )}
                    </ToggleButtonGroup>
                    <IconButton onClick={()=>{ if (curIndex < props.curFloor* 10 +props.array.length -1) {setCurIndex(curIndex+1)} }}><ChevronRight/></IconButton>
                
            </Box>
        
        
    );
}

export default RoomButtonGroup;