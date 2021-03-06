import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import {LoginService} from "../services/Services";
import {TOKEN_KEY, USER_ID_KEY, USER_NAME_KEY} from "../utils/Constants";
import Routes from '../Routes';

// Component to login
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
            correctLogin: true
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        let {login, password} = this.state;
        LoginService(login, password)
            .then(res => {
                console.log(res);
                // Set the error value
                if (res.data.result.status === "failure") {
                    this.setState({correctLogin: false});
                    return;
                }

                // Save the user_name and token to allow inputMessage to send a message
                localStorage.setItem(TOKEN_KEY, res.data.result.token);
                localStorage.setItem(USER_ID_KEY, res.data.result.id);
                localStorage.setItem(USER_NAME_KEY, this.state.login);
                this.props.history.push(Routes.conversations);
            })
            .catch(err => {
                console.log(err);
            });
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    wrongLogin = () => {
        if (!this.state.correctLogin)
            return (
                <span style={{color: 'red'}}>Mauvais login ou mot de passe</span>
            );
        return ' ';
    }


    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    {this.wrongLogin()}
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="login"
                            name="login"
                            autoComplete="email"
                            onChange={this.changeHandler}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            onChange={this.changeHandler}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.onSubmit}
                            className={classes.submit}
                        >
                            Connecter
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Pas encore inscrit?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

const styles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
