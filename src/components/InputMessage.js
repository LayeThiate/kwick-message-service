import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { SentMessage } from '../services/Services';
import { TOKEN_KEY, USER_ID_KEY } from '../utils/Constants';


class InputMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: ''}
    }

    changeHandler = (event) => {
        let val = event.target.value;
        this.setState({ content: val });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem(TOKEN_KEY);
        const userId = localStorage.getItem(USER_ID_KEY);
        SentMessage(token, userId, this.state.content)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
        //console.log(this.state.content);

    }

    render() {
        const { classes } = this.props;
        return (
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="filled-adornment-message">Envoyer un message</InputLabel>
                <FilledInput
                    id="filled-adornment-message"
                    onChange={this.changeHandler}
                    endAdornment={
                        <Button
                            autoFocus
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>send</Icon>}
                            onClick={this.onSubmit}
                        >
                            Envoyé
                        </Button>
                    }
                />
            </FormControl>
        );
    }
}

const styles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
      },
}));

InputMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputMessage);