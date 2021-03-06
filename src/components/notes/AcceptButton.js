import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Icons
import CheckIcon from '@material-ui/icons/Check'

// Redux stuff
import { connect } from 'react-redux'
import { accept } from '../../redux/actions/dataActions'

export class AcceptButton extends Component {
    accept = () => {
        this.props.accept(this.props.customerName);
    };

    render() {
        const acceptButton = (
            <MyButton tip='Accept' onClick={this.accept}>
                <CheckIcon color='primary' />
            </MyButton>
        )

        return acceptButton;
    }
}

AcceptButton.propTypes = {
    user: PropTypes.object.isRequired,
    customerName: PropTypes.string.isRequired,
    accept: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    accept
}

export default connect(mapStateToProps, mapActionsToProps)(AcceptButton)