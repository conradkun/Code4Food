// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import {GetShitDone} from '../../../imports/get_shit_done';
import {Food} from '../../../imports/api/food';
import Fading from 'react-fade';
export default class EatModal extends Component {
    constructor() {
        super();

        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        setTimeout(function () {
            this._onSubmit();
        }.bind(this), 4000);
    }

    _onSubmit() {
        console.log(this.state);
        this.props.onSubmit(this.props.id);
    }


    render() {
        return (
            <Fading>
                <Layer onClose={this.props.onClose} closer={false} align="center"
                >
                    <Fading duration={.4}>
                        <Box fill={true} align="center" justify="center" pad={{vertical: 'large', horizontal: 'small'}}>
                            <img src="/Eating.gif" className="gif"/>
                        </Box>
                    </Fading>
                </Layer>
            </Fading>
        );
    }
}

