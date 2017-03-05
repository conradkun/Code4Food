// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';


export default class AddFoodModal extends Component {
    constructor () {
        super();

        this._onSubmit = this._onSubmit.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onCaloriesChange = this._onCaloriesChange.bind(this);
        this.state = {
            name: undefined,
            calories: 0,
            error: undefined
        };
    }

    _onSubmit (event){
        event.preventDefault();
        console.log(this.state);
        if (this.state.name && this.state.calories && Number.isInteger(this.state.calories)) {
            this.props.onSubmit({
                name: this.state.name,
                calories: this.state.calories
            });
        }
        else {
            Bert.alert("This information are incorrect", 'danger', 'fixed-top', 'fa-remove' );
        }
    }

    _onNameChange (event) {
        this.setState({name: event.target.value});
    }

    _onCaloriesChange (event) {
        if(Number.isInteger(parseInt(event.target.value)) && parseInt(event.target.value) < 2000) {
            this.setState({error: undefined});
            this.setState({calories: parseInt(event.target.value)});
        }
        else {
            this.setState({error: "This is not a valid amount of calories (or this is too big for a meal)"})
        }
    }

    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
                   >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Add an Item to your Pantry !</h1></header>
                        <FormFields>
                            <fieldset>
                                <FormField label="Name"
                                           >
                                    <input name="name" type="text" placeholder="Item Name"
                                           onChange={this._onNameChange} />
                                </FormField>
                                <FormField label="Calories" error={this.state.error}
                                >
                                    <input name="name" type="text" placeholder="Calories"
                                           onChange={
                                               this._onCaloriesChange
                                           } />
                                </FormField>
                            </fieldset>
                        </FormFields>
                        <Footer pad={{vertical: 'medium'}} justify='center'>
                            <Button label="Import this item" primary={true}
                                    onClick={this._onSubmit} type="submit"/>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}
