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
import SVGIcon from 'grommet/components/SVGIcon';
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
        let pulse;
        if(this.props.location.pathname !== '/app/inventory'){
            pulse =(
            <Pulse onClick={() => {this.child._onRequestForAdd()}}/>
            )
        }
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
                    {pulse}
                    <Value value={Meteor.user().profile.gold}
                           icon={<SVGIcon viewBox='90 90 220 220'
                                          version='1.1'
                                          type="logo"
                                          size="medium"
                           >
                               <g id="svgg">
                                   <g id="svgg">
                                       <path id="path0"
                                             d="M162.500 106.250 L 162.500 112.500 150.000 112.500 L 137.500 112.500 137.500 118.750 L 137.500 125.000 131.250 125.000 L 125.000 125.000 125.000 137.500 L 125.000 150.000 118.750 150.000 L 112.500 150.000 112.500 200.000 L 112.500 250.000 118.750 250.000 L 125.000 250.000 125.000 262.500 L 125.000 275.000 131.250 275.000 L 137.500 275.000 137.500 281.250 L 137.500 287.500 150.000 287.500 L 162.500 287.500 162.500 293.750 L 162.500 300.000 200.000 300.000 L 237.500 300.000 237.500 293.750 L 237.500 287.500 250.000 287.500 L 262.500 287.500 262.500 275.000 L 262.500 262.500 268.750 262.500 L 275.000 262.500 275.000 250.000 L 275.000 237.500 281.250 237.500 L 287.500 237.500 287.500 200.000 L 287.500 162.500 281.250 162.500 L 275.000 162.500 275.000 150.000 L 275.000 137.500 268.750 137.500 L 262.500 137.500 262.500 125.000 L 262.500 112.500 250.000 112.500 L 237.500 112.500 237.500 106.250 L 237.500 100.000 200.000 100.000 L 162.500 100.000 162.500 106.250 M212.500 118.750 L 212.500 125.000 225.000 125.000 L 237.500 125.000 237.500 131.250 L 237.500 137.500 243.750 137.500 L 250.000 137.500 250.000 150.000 L 250.000 162.500 256.250 162.500 L 262.500 162.500 262.500 200.000 L 262.500 237.500 256.250 237.500 L 250.000 237.500 250.000 250.000 L 250.000 262.500 243.750 262.500 L 237.500 262.500 237.500 268.750 L 237.500 275.000 225.000 275.000 L 212.500 275.000 212.500 281.250 L 212.500 287.500 193.750 287.500 L 175.000 287.500 175.000 281.250 L 175.000 275.000 162.500 275.000 L 150.000 275.000 150.000 268.750 L 150.000 262.500 143.750 262.500 L 137.500 262.500 137.500 250.000 L 137.500 237.500 131.250 237.500 L 125.000 237.500 125.000 200.000 L 125.000 162.500 131.250 162.500 L 137.500 162.500 137.500 150.000 L 137.500 137.500 143.750 137.500 L 150.000 137.500 150.000 131.250 L 150.000 125.000 162.500 125.000 L 175.000 125.000 175.000 118.750 L 175.000 112.500 193.750 112.500 L 212.500 112.500 212.500 118.750 M212.500 193.750 L 212.500 250.000 193.750 250.000 L 175.000 250.000 175.000 256.250 L 175.000 262.500 200.000 262.500 L 225.000 262.500 225.000 200.000 L 225.000 137.500 218.750 137.500 L 212.500 137.500 212.500 193.750 "
                                             stroke="none" fill="#000000" fillRule="evenodd"></path>
                                       <path id="path1"
                                             d="M175.000 118.750 L 175.000 125.000 162.500 125.000 L 150.000 125.000 150.000 131.250 L 150.000 137.500 143.750 137.500 L 137.500 137.500 137.500 150.000 L 137.500 162.500 131.250 162.500 L 125.000 162.500 125.000 200.000 L 125.000 237.500 131.250 237.500 L 137.500 237.500 137.500 250.000 L 137.500 262.500 143.750 262.500 L 150.000 262.500 150.000 268.750 L 150.000 275.000 156.250 275.000 L 162.500 275.000 162.500 268.750 L 162.500 262.500 156.250 262.500 L 150.000 262.500 150.000 250.000 L 150.000 237.500 143.750 237.500 L 137.500 237.500 137.500 200.000 L 137.500 162.500 143.750 162.500 L 150.000 162.500 150.000 150.000 L 150.000 137.500 162.500 137.500 L 175.000 137.500 175.000 193.750 L 175.000 250.000 181.250 250.000 L 187.500 250.000 187.500 200.000 L 187.500 150.000 200.000 150.000 L 212.500 150.000 212.500 143.750 L 212.500 137.500 193.750 137.500 L 175.000 137.500 175.000 131.250 L 175.000 125.000 193.750 125.000 L 212.500 125.000 212.500 118.750 L 212.500 112.500 193.750 112.500 L 175.000 112.500 175.000 118.750 "
                                             stroke="none" fill="#ffffff" fillRule="evenodd"></path>
                                       <path id="path2"
                                             d="M175.000 131.250 L 175.000 137.500 162.500 137.500 L 150.000 137.500 150.000 150.000 L 150.000 162.500 143.750 162.500 L 137.500 162.500 137.500 200.000 L 137.500 237.500 143.750 237.500 L 150.000 237.500 150.000 250.000 L 150.000 262.500 156.250 262.500 L 162.500 262.500 162.500 268.750 L 162.500 275.000 168.750 275.000 L 175.000 275.000 175.000 281.250 L 175.000 287.500 193.750 287.500 L 212.500 287.500 212.500 281.250 L 212.500 275.000 225.000 275.000 L 237.500 275.000 237.500 268.750 L 237.500 262.500 243.750 262.500 L 250.000 262.500 250.000 250.000 L 250.000 237.500 256.250 237.500 L 262.500 237.500 262.500 200.000 L 262.500 162.500 256.250 162.500 L 250.000 162.500 250.000 150.000 L 250.000 137.500 243.750 137.500 L 237.500 137.500 237.500 131.250 L 237.500 125.000 206.250 125.000 L 175.000 125.000 175.000 131.250 M225.000 200.000 L 225.000 262.500 200.000 262.500 L 175.000 262.500 175.000 200.000 L 175.000 137.500 200.000 137.500 L 225.000 137.500 225.000 200.000 M187.500 200.000 L 187.500 250.000 200.000 250.000 L 212.500 250.000 212.500 200.000 L 212.500 150.000 200.000 150.000 L 187.500 150.000 187.500 200.000 "
                                             stroke="none" fill="#ffee00" fillRule="evenodd"></path>
                                   </g>
                               </g>
                           </SVGIcon>}
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
                <Box flex={true} full={true}>
                    {this._renderHeader()}
                    {children}
                </Box>
        );
    }
};