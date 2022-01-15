import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';

import axios from 'axios';

export default function GenerateComponent(props: any) {
    const { id, label, url, state, hook } = props.componentDetails;
    const { componentTree } = props;

    const handleRequest = (url: string) => {
        axios.get(`${url}`).then((res) => console.log(res));
    };

    const formatComponentName = (name: string) => {
        if (name) {
            let removeSpaces = name.replace(/\s+/g, '');
            const formattedName = removeSpaces.charAt(0).toUpperCase() + removeSpaces.slice(1);
            return formattedName;
        }
        return;
    };

    const emptyCard = (
        <React.Fragment>
            <CardContent>
                <Typography variant="caption">Default Empty Component</Typography>
                <Typography variant="h3">Name: </Typography>
            </CardContent>
            <CardActions></CardActions>
        </React.Fragment>
    );

    const detailCard = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h3">Name: {formatComponentName(label)}</Typography>
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
                {state ? <Typography variant="body2">State: {state}</Typography> : null}
                {hook ? <Typography variant="body2">Hook: {hook}</Typography> : null}
            </CardActions>
        </React.Fragment>
    );

    if (label !== 'App' || url !== null)
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
