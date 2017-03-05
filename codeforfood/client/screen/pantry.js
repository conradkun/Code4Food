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
import Loading from '../components/common/loading';
import Paragraph from "grommet/components/Paragraph";
import AppSettings from '../utils/app_settings';
import FoodCard from '../components/pantry/food_card';
import AddFoodModal from '../components/pantry/add_food_modal';
import BuyModal from '../components/pantry/buy_modal';
import NoFood from '../components/pantry/no_food';
import {Food} from '../../imports/api/food';
import Spinner from 'react-spinkit';
import Card from 'grommet/components/Card';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Tiles from 'grommet/components/Tiles';



class PantryScreen extends Component{
    componentDidMount() {
        setTimeout(function() { this.setState({loading: false}); }.bind(this), 200);
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    constructor(props) {
        super(props);
        this._onRequestForAdd = this._onRequestForAddFood.bind(this);
        this._renderCards = this._renderCards.bind(this);
        this._onAddFood = this._onAddFood.bind(this);
        this._onRequestForAddFood = this._onRequestForAddFood.bind(this);
        this._onRequestForAddFoodClose = this._onRequestForAddFoodClose.bind(this);
        this._onBuy = this._onBuy.bind(this);
        this._onRequestForBuy = this._onRequestForBuy.bind(this);
        this._onRequestForBuyClose = this._onRequestForBuyClose.bind(this);
        this._search = this._search.bind(this);
        this.state = {
            loading: true,
            addFood: false,
            buy: false,
            buyParameters: {
                loading: true,
                id: undefined,
                name: undefined,
                calories: undefined
            }
        }
    }
    _search(food) {
        let name = food.name;
        return name.toLowerCase().indexOf(this.props.searchString.toLowerCase()) != -1;
    }
    _renderCards() {
        return this.props.foods.filter(this._search).map((food) => {
            return(
                <FoodCard key={food._id} name={food.name} id={food._id} calories={food.calories} onBuy={this._onRequestForBuy}/>
            )
        });
    }
    _onAddFood (food) {
        Meteor.call('addFood', food, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({addFood: false});
    }

    _onRequestForAddFoodClose () {
        this.setState({addFood: false});
    }

    _onRequestForAddFood () {
        this.setState({addFood: true});
    }
    _onBuy (id) {
        Meteor.call('buy', id, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({buy: false});
    }

    _onRequestForBuyClose () {
        this.setState({buy: false});
    }

    _onRequestForBuy ({id, name, calories}) {
        this.setState({buyParameters: {id, name, calories}, buy: true});
    }

    render(){
        let modal;
        if (this.state.addFood) {
            modal = (
                <AddFoodModal onClose={this._onRequestForAddFoodClose}
                               onSubmit={this._onAddFood} />
            );
        } else if (this.state.buy){
            console.log("buying");
            modal = (
                <BuyModal
                    id={this.state.buyParameters.id}
                    name={this.state.buyParameters.name}
                    calories={this.state.buyParameters.calories} onSubmit={this._onBuy}/>
            );
        }
        if (this.state.loading){
            return(
                <Box colorIndex={AppSettings.backgroundColor} full={true}>
                    <Loading/>
                </Box>
            )
        }
        return(
            <Box colorIndex={AppSettings.backgroundColor} align="center" alignSelf="stretch" flex={true}>
                {(this.props.foods.length == 0) ? <NoFood/> : null}
                {(this.props.foods.length < 3) ? <Paragraph>You have to create at least 3 items in your pantry before using Code 4 Food !</Paragraph> : null}
                <Tiles fill={true} flush={false}>
                    {this._renderCards()}
                </Tiles>
                {modal}
            </Box>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('foods');
    return {
        foods: Food.find({}).fetch().reverse()
    }
}, PantryScreen);