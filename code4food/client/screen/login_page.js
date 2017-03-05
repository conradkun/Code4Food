import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import LoginForm from '../components/login/login_form'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Spinner from 'react-spinkit';
import Logo from '../components/common/logo';
import Loading from '../components/common/loading';
import Fade from 'react-fade';


export default class LoginPage extends TrackerReact(React.Component) {
    constructor(props){
        super(props);
        this._Loader = this._Loader.bind(this);
        this.state = {
            errors: [],
            loading: true,
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(info){
        Meteor.loginWithPassword(info.username, info.password, (err) => {
            if(err){
                console.log(err.reason);
                this.setState({
                    errors: [err.reason]
                });
            } else {
                browserHistory.push('/app');
            }
        });
    }

    componentDidMount(){
        this._Loader();
    }
    _Loader(){
        setTimeout(function() { this.setState({loading: false}); }.bind(this), 500);
    }


    render(){
        let content;
        console.log("Loggin in", Meteor.loggingIn());
        if (Meteor.userId() && !Meteor.loggingIn()){

                content = (
                    <Loading/>
                );
        }
        else {
            content = (
                <Fade duration={.4}>
                <LoginForm logo={<Logo />} align='center' errors={this.state.errors} onSubmit={this._handleSubmit.bind(this)}/>
                </Fade>
            )
        }

        if(this.state.loading){
            content = (
                <Loading/>
            );
        }

        return (
                <Box full={true} direction='column' align='center' justify='center' alignContent='center'>
                    {content}
                </Box>
        );
    }
}