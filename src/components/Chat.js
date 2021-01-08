import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Message from './Messages';
import UserLogged from './UserLogged';
import InputMessage from './InputMessage';

class Chat extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid key="users" item xs={3}>
                    <UserLogged />
                </Grid>
                <Grid key="messages" item xs={9}>
                    <Message />
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
    }
}));

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);