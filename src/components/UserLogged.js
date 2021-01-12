import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Users } from "../services/Services";
import { TOKEN_KEY } from "../utils/Constants";

class UserLogged extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem(TOKEN_KEY)
        Users(token)
            .then(res => {
                const users = res.data.result.user;
                this.setState({ users });
            })
            .catch(error => {
                console.log(error);
            })
    }

    listUsers = () => {
        // console.log(this.state.users);
        return this.state.users.map(user => {
            return (
                <ListItem alignItems="flex-start" divider key={user}>
                    <ListItemAvatar>
                        <Avatar alt={user} src="name" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user}
                    />
                </ListItem>
            )
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                {this.listUsers()}
            </List>
        );
    }

}

const styles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

UserLogged.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserLogged);