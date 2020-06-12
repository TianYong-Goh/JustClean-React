
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/iconword.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const style = theme => ({
    ...theme.spreadThis
})

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/'); // redirect to home page
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt='JustClean' className={classes.image} />
                    <Typography variant='h3' className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth
                            helperText={errors.email} error={errors.email ? true : false} />
                        <TextField id='password' name='password' type='password' label='Password' className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth
                            helperText={errors.password} error={errors.password ? true : false} />
                        {errors.general && <Typography variant='body2' className={classes.customError}>
                            {errors.general}
                        </Typography>}
                        <Button type='submit' variant='contained' color='primary' disable={loading} className={classes.button}>
                            Login {loading && (<CircularProgress size={30} className={classes.progress} />)}
                        </Button>
                        <br />
                        <small>Don't have an account? Sign up <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
        // inside the errors received, if there is a field of email means the email is invalid
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(style)(login)
