// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Value from 'grommet/components/Value';
import Button from 'grommet/components/Button';
import Money from 'grommet/components/icons/base/Money';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import User from 'grommet/components/icons/base/User'
import Search from 'grommet/components/Search';
import More from 'grommet/components/icons/base/More';
import Pulse from 'grommet/components/icons/Pulse';
import Basket from 'grommet/components/icons/base/Basket';
import Task from 'grommet/components/icons/base/Task';
import Edit from 'grommet/components/icons/base/Edit';
import Close from 'grommet/components/icons/base/Close';
import MenuIcon from 'grommet/components/icons/base/Menu';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import AppSettings from './utils/app_settings';

export default class Container extends TrackerReact(React.Component) {

    constructor () {
        super();
        this._logout = this._logout.bind(this);
        this.state = {
            searchString: '',
        }
    }
    _logout(){
        Meteor.logout();
        browserHistory.push('/');
    }

    componentWillMount() {
        if(!Meteor.userId()){
            browserHistory.push('/');
        }
    }



    _renderTitle () {
        return (
            <Title pad='small' responsive={false}>
                    <Box align='center' direction='row'>
                        <Title>Quest 4 Food</Title>
                    </Box>
            </Title>
        );
    }

    _renderHeader(){
        return(
            <Header fixed={false}
                    float={false}
                    size='large'
                    splash={false}>
                {this._renderTitle()}
                <Box flex={true}
                     justify='center'
                     direction='row'
                     pad={{between: "small"}}
                     responsive={false}>
                    <Search inline={true}
                            fill={true}
                            size='medium'
                            placeHolder='Search'
                            onDOMChange={(event) => {this.setState({searchString: event.target.value})}}
                            dropAlign={{"right": "right", "top": "top"}} />

                    <Pulse onClick={() => {this.child._onRequestForAdd()}}/>
                    <Value value={Meteor.user().profile.gold}
                           icon={<Money size='medium'
                           />}
                           size='medium'
                    />
                    <Anchor icon={<Task />}
                            onClick={()=>{{browserHistory.push('/app')}}}
                            primary={false}
                            animateIcon={true} />
                    <Anchor icon={<Basket />}
                            onClick={()=>{{browserHistory.push('/app/pantry')}}}
                            primary={false}
                            animateIcon={true} />
                    <Menu icon={<More />}
                          dropAlign={{"right": "right"}}
                          direction="row"
                            >
                        <Anchor href='#'
                                onClick={this._logout}>
                            Log out
                        </Anchor>
                        <Anchor href='#'>
                            Second
                        </Anchor>
                        <Anchor href='#'>
                            Third
                        </Anchor>
                    </Menu>
                </Box>
            </Header>
        )
    }

    render () {
        let children = React.cloneElement(this.props.children, { searchString: this.state.searchString, onRef:((ref) => (this.child = ref))});
        return (
                <Box>
                    {this._renderHeader()}
                    {children}
                </Box>
        );
    }
};