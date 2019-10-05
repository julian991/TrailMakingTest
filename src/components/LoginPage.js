import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Button, Snackbar, SnackbarContent } from '@material-ui/core';
import axios from 'axios';

class LoginPage extends Component {

    cancelToken = axios.CancelToken;
    souce = this.cancelToken.source();

    state = {
        username: null,
        password: null,
        success: null
    }

    componentWillUnmount() {
        this.souce.cancel("Operation Cancelled")
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    checkLogin =  () => {
        try {
            console.log(this.state)
            // checks login details against DB
            axios.get('https://cors-anywhere.herokuapp.com/https://easya.fyp2017.com/api/tmt/login', {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
                .then(res => {
                    console.log(res)

                    this.setState({
                        success: res.data.result === "success" ? true : false
                    })
                })
                .catch(e => {
                    //console.log(e)
                    this.setState({
                        success: false
                    })
                });
        } catch(err){
            if( axios.isCancel(err)){
                console.log("Request cancelled", err.message);

            }
        }
    }

    render() {
        return (
            <form>
                <div className="form-group experiment">
                    <br />
                    <label style={{ fontFamily: 'Helvetica' }}>Enter your username</label>
                    <input type="Username" className="form-control" placeholder="Username" ref={(username) => this.username = username} onChange={this.handleUsername} />
                    <label style={{ paddingTop: 10, fontFamily: 'Helvetica' }}>Enter your password</label>
                    <input type="Password" className="form-control" placeholder="Password" ref={(password) => this.password = password} onChange={this.handlePassword} />
                    <br />

                    <Button className="btn btn-dark experiment-btn" onClick={this.checkLogin}>
                        Login > {this.state.success ? <Redirect to={'/user-page'} /> : null}

                    </Button>

                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={this.state.success === false} autoHideDuration={600}>
                        <SnackbarContent variant="error" message="Wrong Username/Password!" />
                    </Snackbar>

                    <Link to={'/sign-up-page'}>
                        <span style={{ color: "#A0A0A0" }}>Sign up</span>
                    </Link>

                    <br />

                    <Link to={'/forget-password'}>
                        <span style={{ color: "#A0A0A0" }}>Don't remember your password?</span>
                    </Link>
                </div>
            </form>
        )
    }
}

export default LoginPage;