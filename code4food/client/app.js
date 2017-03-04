// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GrommetApp from 'grommet/components/App';
import Spinner from 'react-spinkit';
export default class App extends TrackerReact(React.Component) {
    constructor(){
        super();
        this.state = {
        };
    }


    render () {
        return (
            <GrommetApp centered={false}>
                {this.props.children}
            </GrommetApp>

        );
    }
};