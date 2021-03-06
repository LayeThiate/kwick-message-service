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
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/styles'
import PropTypes from 'prop-types';
import {SignUpService} from '../services/Services';
import {TOKEN_KEY, USER_ID_KEY} from "../utils/Constants";
import Routes from '../Routes';

// Sign up component
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
            isPassed: true,
            errorMessage: ''
        };
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    onSubmit = (event) => {
        event.preventDefault();
        let {login, password} = this.state;
        SignUpService(login, password)
            .then(res => {
                console.log(res);
                // Set the error value
                if (res.data.result.status === "failure") {
                    this.setState({errorMessage: res.data.result.message});
                    return;
                }
                localStorage.setItem(TOKEN_KEY, res.data.result.token);
                localStorage.setItem(USER_ID_KEY, res.data.result.id);
                this.props.history.push(Routes.conversations);
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Show the error returned by the sever
    showErrorMessage = () => {
        return (
            <span style={{color: 'red'}}>{this.state.errorMessage}</span>
        );
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
                        Inscription
                    </Typography>
                    {this.showErrorMessage()}
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="login"
                                    label="login"
                                    name="login"
                                    autoComplete="email"
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onSubmit}>
                            Inscrire
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href={Routes.login} variant="body2">
                                    Vous avez déjà un compte? connecter
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);