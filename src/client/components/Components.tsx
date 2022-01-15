import React, { useState } from 'react';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, createStyles, makeStyles, Theme } from '@material-ui/core';

import GenerateComponent from './GenerateComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: 450,
            flexShrink: 0,

            ['& .MuiTextField-root']: { m: 1, width: '25ch' }
        },
        save: {
            marginTop: 20
        }
    })
);

export default function Component() {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [state, setState] = useState('');
    const [hook, setHook] = useState('');
    const [componentDetails, setComponentDetails] = useState({ name: null, url: null, state: null, hook: null });
    // const [componentTreeState, setComponentTreeState] = useState([]);

    const handleSetDetails = (name: string, url?: string, state?: string, hook?: string) => {
        const newComponentDetails = {
            ...componentDetails,
            name: name,
            url: url,
            state: state,
            hook: hook
        };
        setComponentDetails(newComponentDetails);
    };

    // const handleAddToComponentTreeState = (component) => {
    //     setComponentTreeState((componentTreeState) => [...componentTreeState, component]);
    // };

    const handleOnChangeName = (event: any) => {
        setName(event.target.value);
    };

    const handleOnChangeUrl = (event: any) => {
        setUrl(event.target.value);
    };

    const handleOnChangeState = (event: any) => {
        setState(event.target.value);
    };

    const handleOnChangeHook = (event: any) => {
        setHook(event.target.value);
    };

    // console.log('componentDetails', componentDetails);
    // console.log('name', name);
    // console.log('componentTreeState', componentTreeState);

    // https://jsonplaceholder.typicode.com/todos/1

    return (
        <div>
            <GenerateComponent componentDetails={componentDetails} />
            <Box className={classes.form} component="form" m={2} mt={5}>
                <div>
                    <FormControl className={classes.form} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            aria-describedby="outlined-weight-helper-text"
                            placeholder="Add your component name"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                            onChange={handleOnChangeName}
                        />
                        <FormHelperText id="outlined-weight-helper-text">Name</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.form} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            aria-describedby="outlined-weight-helper-text"
                            placeholder="Add an API call URL"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                            onChange={handleOnChangeUrl}
                        />
                        <FormHelperText id="outlined-weight-helper-text">URL</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.form} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            aria-describedby="outlined-weight-helper-text"
                            placeholder="Set state"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                            onChange={handleOnChangeState}
                        />
                        <FormHelperText id="outlined-weight-helper-text">State</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.form} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            aria-describedby="outlined-weight-helper-text"
                            placeholder="Add a hook"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                            onChange={handleOnChangeHook}
                        />
                        <FormHelperText id="outlined-weight-helper-text">Hooks</FormHelperText>
                    </FormControl>
                    <Button
                        variant="outlined"
                        className={classes.save}
                        onClick={() => {
                            handleSetDetails(name, url, state, hook);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </div>
    );
}
