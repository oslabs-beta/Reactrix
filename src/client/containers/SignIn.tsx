import * as React from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';

import Button, { ButtonProps } from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { AnyRecord } from 'dns';

//imported a template button and adjusted the styling to preference
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({

    color: theme.palette.getContrastText(grey[800]),
    backgroundColor: grey[800],
    '&:hover': {
        backgroundColor: grey[700]
    }
}));

//defining the component Copyright on the sign-in page while adjusting the styling
const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Reactrix'} {new Date().getFullYear()}
        </Typography>
    );
}

export default function SignIn() {

    // const useAuth = () => {
    //     const user = { loggedIn: false };
    //     fetch('http://localhost:3000/auth/github')
    //     .then((data) => {
    //         console.log(data);
    //         return user && user.loggedIn;
    //     })
    // };

    // const oAuth = () => {
    //     const isAuth: any = useAuth();
    //     return isAuth ? <Outlet /> : <Navigate to="/" />;
    // };
    const oAuth = () => {
        // event.preventDefault();
        window.open("http://localhost:3000/auth/github", "_self")
         
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password')
        });
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    minWidth: 400,
                    marginTop: 14,
                    p: 5,
                    boxShadow: 3,
                    borderRadius: 2
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        flexWrap: 'wrap'
                    }}
                >
                    <AccountTreeIcon fontSize="large" />
                    <Typography component="h1" variant="h3" sx={{ fontWeight: 700, marginBottom: 2, p: 1 }}>
                        Reactrix
                    </Typography>
                </div>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                    <Grid container>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <ColorButton type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 5 }} onClick={oAuth}>
                            Login with GitHub
                        </ColorButton>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/">{'Create account'}</Link>
                        </Grid>
                        <Grid item>
                            <Link to="/dashboard">{'Continue as Guest'}</Link>
                        </Grid>
                        {/* <Link to="/auth/github">Login</Link> */}
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

// href="/auth/github"
