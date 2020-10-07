import React from 'react';
import {ButtonGroup, Button} from '@material-ui/core';

function RoomButtonGroup({array}){

    return(
        <ButtonGroup aria-label = "room button group">
            {array.map(room => (<Button>{room.name}</Button>))}
        </ButtonGroup>
    );
}

export default RoomButtonGroup;