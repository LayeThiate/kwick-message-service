import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {FixedSizeList} from 'react-window';
import PropTypes from 'prop-types';
import {TalkList} from "../services/Services";
import {TOKEN_KEY, USER_NAME_KEY} from "../utils/Constants";
import {time} from "../utils/Utils";

// This component displays all messages by most recent to older
// user can filter the messages to show
class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [], // all messages
            messageToDisplay: [], // messages to display
            isLoaded: false,
            hourFilter: 0,
            optionsFilter: [3, 6, 12],
        };
    }

    // Fetch all messages
    getMessages = () => {
        const token = localStorage.getItem(TOKEN_KEY);
        TalkList(token)
            .then(res => {
                const messages = res.data.result.talk;
                // sorte messages
                const sortedMessages = messages.sort((t1, t2) => {
                    return t2.timestamp - t1.timestamp;
                });
                this.setState({messages: messages, messageToDisplay: sortedMessages, isLoaded: true});
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Set message to display depending of filter value
    filterMessage = () => {
        if (this.state.hourFilter != 0) {
            // Timestamp of the value choosen
            const timestampSec = Date.now() - this.state.hourFilter * 3600;
            const newMessages =
                this.state.messages.filter(message => {
                    // Compare timestamp of each message to that choosen
                    const diffSec = Math.floor(
                        (new Date(timestampSec) - new Date(message.timestamp * 1000)) / 1000);
                    return diffSec < this.state.hourFilter * 3600;
                });
            // console.log(newMessages);
            this.setState({messageToDisplay: newMessages});
        } else {
            this.setState({messageToDisplay: this.state.messages});
        }
    }

    // Set the filter value choosen
    handleFilter = event => {
        this.setState({hourFilter: event.target.value}, this.filterMessage);
    }

    // Fetch All messages to display
    componentDidMount() {
        if (this.state.messageToDisplay.length === 0) {
            this.getMessages();
        } else {
            this.filterMessage();
        }
    }

    // Show a message 
    Row = ({index, style}) => {
        const mess = this.state.messageToDisplay[index];
        // console.log(mess);
        const userName = localStorage.getItem(USER_NAME_KEY);
        const styles = {
            message: {
                border: '2px solid #dedede',
                backgroundColor: '#f1f1f1',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px 0',
                overflow: 'auto'
            },
            darkMessage: {
                border: '2px solid #ccc',
                backgroundColor: '#ddd',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px 0',
                overflow: 'auto'
            },
            time_right: {
                float: 'right',
                color: '#aaa'
            }
        }
        return (
            <div style={mess.user_name === userName ? styles.darkMessage : styles.message}>
                <h4>{mess.user_name}</h4>
                <p>{mess.content}</p>
                <span style={style.time_right}>{time(mess.timestamp)}</span>
            </div>
        );
    };

    FilterOption = () => {
        return this.state.optionsFilter.map(option => {
            return (
                <option value={option}>
                    {option}
                </option>
            );
        })
    }

    render() {
        const {classes} = this.props;
        if (this.state.isLoaded)
            return (
                <div>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-time">Heure</InputLabel>
                        <Select
                            native
                            onChange={this.handleFilter}
                            inputProps={{
                                name: 'heure',
                                id: 'filled-time',
                            }}
                        >
                            <option aria-label="None" value={0}/>
                            <option value={3}>3</option>
                            <option value={6}>6</option>
                            <option value={12}>12</option>
                            {/* {this.FilterOption} */}
                        </Select>
                    </FormControl>
                    <FixedSizeList
                        height={500}
                        itemCount={this.state.messageToDisplay.length}
                        itemSize={50}
                        className={classes.list}>
                        {this.Row}
                    </FixedSizeList>
                </div>
            );
        else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }

}

const styles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    list: {
        height: '100%',
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

Message.propTypes = {classes: PropTypes.object.isRequired,};
export default withStyles(styles)(Message);