/**
 * Created by justin on 04/03/17.
 */
import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Add from 'grommet/components/icons/base/Add';
import Edit from 'grommet/components/icons/base/Edit';
import Clock from 'grommet/components/icons/base/Clock';
import CreditCard from 'grommet/components/icons/base/CreditCard';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Tiles from 'grommet/components/Tiles';
import Heading from 'grommet/components/Heading';

import {Food} from '../../../imports/api/food';

import Card from 'grommet/components/Card';
export default class FoodCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {id, name, calories} = this.props;
        let header = (

            <Header>
                <Heading strong={true}
                         tag='h3'>
                    {name + ' ' + calories + 'kcal'}
                </Heading>
                <Box
                    flex={true}
                    justify='end'
                    align="center"
                    pad={{between: "medium"}}
                    direction='row'>
                </Box>
            </Header>
        );
        let link=(
            <Anchor icon={<CreditCard />}
                    label="Buy this"
                    onClick={()=>{{this.props.onBuy({id, name, calories})}}}
                    primary={true}
                    animateIcon={true} />
        );
        return (
            <Card margin="medium" colorIndex="light-1" key={this.props.name} link={link} heading={header}
            />
        )
    }
}

