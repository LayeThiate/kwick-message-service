import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { TalkList } from "../services/Services";
import { TOKEN_KEY } from "../utils/Constants";
import { hour } from "../utils/Utils";

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem(TOKEN_KEY)
        TalkList(token)
            .then(res => {
                const messages = res.data.result.talk;
                this.setState({ messages: messages });
            })
            .catch(error => {
                console.log(error);
            });
    }

    listMessage = () => {
        const { classes } = this.props;
        return this.state.messages.map((message, index) => {
            return (
                <ListItem alignItems="flex-start" divider key={index}>
                    <ListItemAvatar>
                        <Avatar alt={message.user_name} src="name" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={message.user_name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {message.content}
                                </Typography>
                                <Typography
                                    component="span"
                                    align="right"
                                >
                                    {hour(message.timestamp)}
                                </Typography>
                            </React.Fragment>

                            // <div className="container darker">
                            //         <p>{message.content}</p>
                            //         <span className={classes.time_left}>{hour(message.timestamp)}</span>
                            // </div>
                        }
                    />
                </ListItem>
            )
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                {this.listMessage()}
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
    time_left: {
        float: 'right',
    }
}));

Message.propTypes = { classes: PropTypes.object.isRequired, };

export default withStyles(styles)(Message);