import * as React from 'react';
import { Link } from 'react-router-dom';

import Button, { ButtonProps } from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [userLoggedIn, setUserLoggedIn] = useState(false);
    // const [passwordState, setPasswordState] = useState('password');

    // // after the token
    //   const handleClicker = () => {
    //     fetch(`https://github.com/login/oauth/authorize`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => handleFetch(data));
    //   };

    //   // step#2 GitHub Oauth
    //     const handleFetch = (client_id) => {
    //       console.log(client_id);
    //       // fetch(`https://github.com/login/oauth/${client_id}`, {
    //       //   method: "POST",
    //       //   headers: {
    //       //     "Content-Type": "application/json",
    //       //   },
    //       // })
    //       // .then((response) => response.json())
    //     };
    color: theme.palette.getContrastText(grey[800]),
    backgroundColor: grey[800],
    '&:hover': {
        backgroundColor: grey[700]
    }
}));

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Reactrix'} {new Date().getFullYear()}
        </Typography>
    );
}

export default function SignIn() {
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
                        <ColorButton type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 5 }}>
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
