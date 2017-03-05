// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import {GetShitDone} from '../../../imports/get_shit_done';
import {Food} from '../../../imports/api/food';
class BuyModal extends Component {
    constructor () {
        super();

        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit (event){
        event.preventDefault();
        console.log(this.state);
            this.props.onSubmit(this.props.id);
    }


    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Are you Sure you want to buy {this.props.name} for {GetShitDone.caloriesToPrice(this.props.id, this.props.foods)} gold ?</h1></header>
                        <Footer pad={{vertical: 'medium'}} justify='center'>
                            <Button label="Yes" fill={true}
                                    onClick={this._onSubmit} type="submit"/>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}
export default createContainer(() => {
    Meteor.subscribe('foods');
    return {
        foods: Food.find({}).fetch()
    }
}, BuyModal);
