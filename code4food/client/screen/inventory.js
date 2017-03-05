import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import { createContainer } from 'meteor/react-meteor-data';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Actions from 'grommet/components/icons/base/Actions';
import Title from 'grommet/components/Title';
import CreditCard from 'grommet/components/icons/base/CreditCard';
import Edit from 'grommet/components/icons/base/Edit';
import Close from 'grommet/components/icons/base/Close';
import MenuIcon from 'grommet/components/icons/base/Menu';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Pulse from 'grommet/components/icons/Pulse';
import Paragraph from "grommet/components/Paragraph";
import Loading from '../components/common/loading';
import AppSettings from '../utils/app_settings';
import FoodCard from '../components/inventory/food_card';
import EatModal from '../components/inventory/eat_modal';
import NoItems from '../components/inventory/no_items';
import {Item} from '../../imports/api/item';
import Tiles from 'grommet/components/Tiles';



class InventoryScreen extends Component{
    componentDidMount() {
        setTimeout(function() { this.setState({loading: false}); }.bind(this), 200);
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    constructor(props) {
        super(props);
        this._renderCards = this._renderCards.bind(this);
        this._onEatFood = this._onEatFood.bind(this);
        this._onRequestForEatFood = this._onRequestForEatFood.bind(this);
        this._onRequestForEatFoodClose = this._onRequestForEatFoodClose.bind(this);
        this._search = this._search.bind(this);
        this.state = {
            loading: true,
            eatFood: false,
            eatFoodId: undefined
        }
    }
    _search(item) {
        let name = item.name;
        return name.toLowerCase().indexOf(this.props.searchString.toLowerCase()) != -1;
    }
    _renderCards() {
        return this.props.items.filter(this._search).map((food) => {
            return(
                <FoodCard key={food._id} name={food.name} id={food._id} calories={food.calories} onEat={this._onRequestForEatFood}/>
            )
        });
    }
    _onEatFood (id) {
        Meteor.call('eat', id, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({eatFood: false});
    }

    _onRequestForEatFoodClose () {
        this.setState({eatFood: false});
    }

    _onRequestForEatFood (id) {
        this.setState({eatFood: true, eatFoodId: id});
    }

    render() {
        console.log(this.state);
        let modal;
        if (this.state.eatFood) {
            modal = (
                <EatModal
                    id={this.state.eatFoodId}
                    onSubmit={this._onEatFood}/>
            );

        }
        if (this.state.loading){
            return(
                <Box colorIndex={AppSettings.backgroundColor} full={true}>
                    <Loading/>
                </Box>
            )
        }
        return (
            <Box colorIndex={AppSettings.backgroundColor} align="center" alignSelf="stretch" flex={true}>
                {(this.props.items.length == 0) ? <NoItems/> : null}
                <Tiles fill={true} flush={false}>
                    {this._renderCards()}
                </Tiles>
                {modal}
            </Box>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('items');
    return {
        items: Item.find({}).fetch().reverse()
    }
}, InventoryScreen);