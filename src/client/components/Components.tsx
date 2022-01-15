import React, { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Box, Button, FormControl, FormHelperText, OutlinedInput, createStyles, makeStyles, Theme } from '@material-ui/core';

import OrgTreeComponent, { useTree } from '../tree';

import GenerateComponent from './GenerateComponent';
import ReusableComponents from '../containers/ReusableComponents';

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
    const { treeRef } = useTree();

    const [id, setId] = useState(2);
    const [label, setLabel] = useState('');
    const [url, setUrl] = useState('');
    const [state, setState] = useState('');
    const [hook, setHook] = useState('');
    const [componentDetails, setComponentDetails] = useState({
        id: 1,
        label: 'App',
        url: null,
        state: null,
        hook: null,
        children: []
    });
    const [reusableComponents, setReusableComponents] = useState<Array<any>>([]);

    const handleSetDetails = (id: any, label?: any, url?: any, state?: any, hook?: any, children?: any[]) => {
        const newComponentDetails = {
            ...componentDetails,
            id: id,
            label: label,
            url: url,
            state: state,
            hook: hook
        };
        setComponentDetails(newComponentDetails);
    };

    const handleAddToComponentTree = (component: any) => {
        setReusableComponents((reusableComponents) => [...reusableComponents, component]);
    };

    const handleOnChangeName = (event: any) => {
        setLabel(event.target.value);
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

    /*
    https://jsonplaceholder.typicode.com/todos/1
    */

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <ReusableComponents reusableComponents={reusableComponents} />
                <div>
                    <OrgTreeComponent data={componentDetails} ref={treeRef} horizontal />
                </div>
            </DndProvider>
            <GenerateComponent componentDetails={componentDetails} reusableComponents={reusableComponents} />
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
                            handleSetDetails(id, label, url, state, hook);
                            handleAddToComponentTree(componentDetails);
                            setId(id + 1);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </div>
    );
}
