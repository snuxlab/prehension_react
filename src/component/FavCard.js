import React from 'react';
import {Card, CardContent, CardActions, makeStyles, Typography} from '@material-ui/core';



const useStyles = makeStyles({
    root: {
        minWidth: 275
    }
});

export default function FavCard() {
    const classes = useStyles();
     return (
     <Card className={classes.root}>
         <CardContent>
             
         </CardContent>
     </Card>
     );
}