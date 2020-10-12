import React, { useEffect, useState } from 'react';
import {IconButton} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import {Box} from '@material-ui/core';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';


function RoomButtonGroup({array, floor}){
    const [curIndex, setCurIndex] = useState();
    const [btnData, setBtnData] = useState();

    const handleIndex = (event, newIndex) => {
        setCurIndex(newIndex);
      };

    return(
        <div>
            <Box display='flex' p={1} justifyContent="center" bgcolor="white">
                
                    <IconButton onClick={()=>{setCurIndex(curIndex-1)}}><ChevronLeft/></IconButton>
                    <ToggleButtonGroup exclusive onChange={handleIndex} aria-label = "room button group">
                        {array.map((item)=>
                        <ToggleButton value={item.id} key={item.id}>{item.name}</ToggleButton>
                        )}
                    </ToggleButtonGroup>
                    <IconButton onClick={()=>{setCurIndex(curIndex+1)}}><ChevronRight/></IconButton>
                
            </Box>
        </div>
    );
}

export default RoomButtonGroup;