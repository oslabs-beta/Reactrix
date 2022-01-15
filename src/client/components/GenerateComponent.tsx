import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';

import axios from 'axios';

export default function GenerateComponent(props: any) {
    const { name, url, state, hook } = props.componentDetails;
    console.log('props: ', props.componentDetails);

    const handleRequest = (url: string) => {
        axios.get(`${url}`).then((res) => console.log(res));
    };

    // const checkIfDuplicateName = (name: string) => {
    //     let checkList = state.components.slice(); // makes copy of components array

    //     // checks to see if inputted comp name already exists
    //     let dupe = false;
    //     checkList.forEach((comp) => {
    //         if (comp.name.toLowerCase() === inputName.toLowerCase()) {
    //             dupe = true;
    //         }
    //     });
    //     return dupe;
    // };

    const emptyCard = (
        <React.Fragment>
            <CardContent>
                <Typography variant="body1">Default Card</Typography>
                <Typography variant="h4">Name: </Typography>
            </CardContent>
            <CardActions></CardActions>
        </React.Fragment>
    );

    const detailCard = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h4">Name: {name}</Typography>
            </CardContent>
            <CardActions>
                {url ? (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            console.log('response from API call: ');
                            handleRequest(url);
                        }}
                    >
                        API Call
                    </Button>
                ) : null}
            </CardActions>
        </React.Fragment>
    );

    if (url !== null)
        return (
            <Box sx={{ minWidth: 275, maxWidth: 550 }}>
                <Card variant="outlined">{detailCard}</Card>
            </Box>
        );
    else
        return (
            <Box sx={{ minWidth: 275, maxWidth: 550 }}>
                <Card variant="outlined">{emptyCard}</Card>
            </Box>
        );
}
