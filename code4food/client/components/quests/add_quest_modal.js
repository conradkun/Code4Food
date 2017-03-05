// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';


export default class AddQuestModal extends Component {
    constructor () {
        super();

        this._onSubmit = this._onSubmit.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onDifficultyChange = this._onDifficultyChange.bind(this);
        this._onDurationChange = this._onDurationChange.bind(this);

        this.state = {
            name: undefined,
            difficulty: "Low",
            duration: "Low",
        };
    }

    _onSubmit (event){
        event.preventDefault();
        console.log(this.state);
        if (this.state.name && this.state.duration && this.state.difficulty) {
            this.props.onSubmit({
                name: this.state.name,
                difficulty: this.state.difficulty,
                duration: this.state.duration,
            });
        }
        else {
            Bert.alert("This information are incorrect", 'danger', 'fixed-top', 'fa-remove' );
        }
    }

    _onNameChange (event) {
        this.setState({name: event.target.value});
    }

    _onDifficultyChange (event) {
        this.setState({difficulty: event.target.value});
    }

    _onDurationChange (event) {
        this.setState({duration: event.target.value});
    }

    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
                   >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <header><h1>Add a Quest</h1></header>
                        <FormFields>
                            <fieldset>
                                <FormField label="Name"
                                           >
                                    <input name="name" type="text" placeholder="Quest Name"
                                           onChange={this._onNameChange} />
                                </FormField>
                                <FormField label="Difficulty">
                                    <select name="Difficulty"
                                            onChange={this._onDifficultyChange}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </FormField>
                                <FormField label="Duration">
                                    <select name="Duration"
                                            onChange={this._onDurationChange}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </FormField>
                            </fieldset>
                        </FormFields>
                        <Footer pad={{vertical: 'medium'}} justify='center'>
                            <Button label="Create this slave" primary={true}
                                    onClick={this._onSubmit} type="submit"/>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}
