import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import { regions } from '../../util/Regions'

// Redux
import { connect } from 'react-redux'
import { editCustomerDetails, editCleanerDetails } from '../../redux/actions/userActions'

// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

// Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio: '',
        location: '',
        open: false
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
        })
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location
        }

        const { type } = this.props.credentials;
        if (type === 'customer') {
            this.props.editCustomerDetails(userDetails);
        } else {
            this.props.editCleanerDetails(userDetails);
        }
        this.handleClose();
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title='Edit details' placement='left' >
                    <IconButton onClick={this.handleOpen} className={classes.button} >
                        <EditIcon color='primary' />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='bio' type='text' label='Bio' multiline row='3'
                                placeholder='A short bio about yourself' className={classes.textField}
                                value={this.state.bio} onChange={this.handleChange} fullWidth />
                            <TextField name='location' type='text' label="Location, Region "
                                className={classes.textField} select
                                value={this.state.location} onChange={this.handleChange} fullWidth>
                                {regions.map((option) => (
                                    <MenuItem key={option.regionName} value={option.regionName}>
                                        {option.regionName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color='primary'>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    editCustomerDetails: PropTypes.func.isRequired,
    editCleanerDetails: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { editCustomerDetails, editCleanerDetails })(withStyles(styles)(EditDetails));
