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
import Value from 'grommet/components/Value';
import Heading from 'grommet/components/Heading';


import {GetShitDone} from '../../../imports/get_shit_done';
import {Food} from '../../../imports/api/food';

import Card from 'grommet/components/Card';
class FoodCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {id, name, calories} = this.props;

        let header = (

            <Header>
                <Box basis="full" align="center">
                <Heading strong={true}
                         tag='h3'>
                    {name}
                </Heading>
                </Box>
            </Header>
        );
        let description = (
            <Box
                flex={true}
                justify='center'
                align="center"
                pad={{between: "medium"}}
                direction='row'>
                <Value value={calories}
                       units='kcal'
                       size="small"
                />
                <Value value={GetShitDone.caloriesToPrice(id, this.props.foods)}
                       units='gold'
                       size="small"/>
            </Box>
        );
        let link=(
            <Box align="center" pad="large">
            <Anchor icon={<CreditCard />}
                    label="Buy this"
                    onClick={()=>{{this.props.onBuy({id, name, calories})}}}
                    primary={true}
                    animateIcon={true} />
            </Box>
        );
        return (
            <Card className="drop-shadow" margin="medium" description={description} colorIndex="light-1" key={this.props.name} link={link} heading={header}
            />
        )
    }
}
export default createContainer(() => {
    Meteor.subscribe('foods');
    return {
        foods: Food.find({}).fetch()
    }
}, FoodCard);

