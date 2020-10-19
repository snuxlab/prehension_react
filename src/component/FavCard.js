import React from 'react';
import {Card, CardContent, CardActions, makeStyles, Typography} from '@material-ui/core';



const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 10
    },
    roomname: {
        fontSize : 14
    },
    roomnop : {
        fontSize : 18
    }
});

export default function FavCard({id, name}) {
    const classes = useStyles();
    const floor = (roomid) => {
        if(~~(roomid/10) === 0) {return "B1" ; }
        else {return (""+ ~~(roomid/10)) ; }
    };

        
    
     return (
     <Card className={classes.root}>
         <CardContent>
             <Typography  className={classes.roomname}>{floor(id)}층 {name}</Typography>
             <Typography  className={classes.roomnop}>현재 2명 이상이 있습니다.</Typography>
         </CardContent>
     </Card>
     );
}