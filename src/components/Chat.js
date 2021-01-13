import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Message from './Messages';
import UserLogged from './UserLogged';
import InputMessage from './InputMessage';
import Routes from '../Routes';
import { LogOut } from "../services/Services";
import {TOKEN_KEY, USER_ID_KEY} from '../utils/Constants';

// Chat page, it uses Message and UserLogged components
class Chat extends React.Component {

    logout = () => {
        const token = localStorage.getItem(TOKEN_KEY);
        const userId = localStorage.getItem(USER_ID_KEY);
        LogOut(token, userId)
        .then(res => {
            this.props.history.push(Routes.login);
        })
        .catch(error => {
            console.log(error);
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid key="users" item xs={3} m={4}>
                    <Button 
                        variant="contained"
                        onClick={this.logout}
                        color="primary" 
                        disableElevation>
                        Déconnecter
                    </Button>
                    <h2>Utilisateurs Connectés</h2>
                    <UserLogged/>
                    
                </Grid>
                <Grid key="messages" item xs={9}>
                    <h2>Messages</h2>
                    <Message/>
                    <InputMessage/>
                </Grid>
            </Grid>
        );
    }
}

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    margin: {
        marginTop: theme.spacing(3)
    }
}));

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);