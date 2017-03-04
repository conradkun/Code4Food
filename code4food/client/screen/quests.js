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
import Add from 'grommet/components/icons/base/Add';
import Edit from 'grommet/components/icons/base/Edit';
import Close from 'grommet/components/icons/base/Close';
import MenuIcon from 'grommet/components/icons/base/Menu';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Pulse from 'grommet/components/icons/Pulse';
import Paragraph from "grommet/components/Paragraph";
import AppSettings from '../utils/app_settings';
import AddQuestModal from '../components/quests/add_quest_modal';
import AddSubQuestModal from '../components/quests/add_sub_quest_modal';
import EditQuestModal from '../components/quests/edit_quest_modal';
import QuestCard from '../components/quests/quest_card';
import EditUserModal from '../components/quests/edit_user_modal';
import DeleteUserModal from '../components/quests/delete_user_modal';
import {Quest, SubQuest} from '../../imports/api/quest';
import Spinner from 'react-spinkit';
import Card from 'grommet/components/Card';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Tiles from 'grommet/components/Tiles';



class QuestsScreen extends Component{
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    constructor(props) {
        super(props);
        this._renderCards = this._renderCards.bind(this);
        this._onAddQuest = this._onAddQuest.bind(this);
        this._onRequestForAddQuest = this._onRequestForAddQuest.bind(this);
        this._onRequestForAddQuestClose = this._onRequestForAddQuestClose.bind(this);
        this._onAddSubQuest = this._onAddSubQuest.bind(this);
        this._onRequestForAddSubQuest = this._onRequestForAddSubQuest.bind(this);
        this._onRequestForAddSubQuestClose = this._onRequestForAddSubQuestClose.bind(this);
        this._onEditQuest = this._onEditQuest.bind(this);
        this._onRequestForEditQuest = this._onRequestForEditQuest.bind(this);
        this._onRequestForEditQuestClose = this._onRequestForEditQuestClose.bind(this);
        this._search = this._search.bind(this);
        this.state = {
            addQuest: false,
            addSubQuest: false,
            editQuest: false,
            editSubQuest: false,
            completeQuest: false,
            add_subQuest_parameter: {
                questId: undefined
            },
            edit: {
                name: undefined,
                difficulty: undefined,
                duration: undefined
            },
            delete: {
                name: undefined,
                id: undefined
            }
        }
    }
    _search(quest) {
        let name = quest.name;
        return name.toLowerCase().indexOf(this.props.searchString.toLowerCase()) != -1;
    }
    _renderCards() {
        return this.props.quests.filter(this._search).map((quest) => {
            return(
                <QuestCard key={quest.name} name={quest.name} id={quest._id} difficulty={quest.difficulty} duration={quest.duration}
                           onEditQuest={this._onRequestForEditQuest} onAddSubQuest={this._onRequestForAddSubQuest}/>
            )
        });
    }
    _onAddQuest (quest) {
        Meteor.call('addQuest', quest, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({addQuest: false});
    }

    _onRequestForAddQuestClose () {
        this.setState({addQuest: false});
    }

    _onRequestForAddQuest () {
        this.setState({addQuest: true});
    }
    _onAddSubQuest (quest) {
        Meteor.call('addSubQuest', quest, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({addSubQuest: false});
    }

    _onRequestForAddSubQuestClose () {
        this.setState({addSubQuest: false});
    }

    _onRequestForAddSubQuest (id) {
        this.setState({add_subQuest_parameter: {questId: id}, addSubQuest: true});
    }
    _onEditQuest (id, quest) {
        console.log(id, quest);
        Meteor.call('editQuest', id, quest, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({editQuest: false});
    }

    _onRequestForEditQuestClose () {
        this.setState({editQuest: false});
    }

    _onRequestForEditQuest ({id, name, difficulty, duration}) {
        this.setState({edit: {id, name, difficulty, duration}, editQuest: true});
    }

    render(){
        let modal;
        if (this.state.addQuest) {
            modal = (
                <AddQuestModal onClose={this._onRequestForAddQuestClose}
                              onSubmit={this._onAddQuest} />
            );
        } else if (this.state.addSubQuest){
            console.log("parent", this.state.add_subQuest_parameter.questId);
            modal = (
                <AddSubQuestModal
                                questId={this.state.add_subQuest_parameter.questId}
                                onClose={this._onRequestForAddSubQuestClose}
                               onSubmit={this._onAddSubQuest} />
            );
        }
        else if (this.state.editQuest){
            modal = <EditQuestModal id={this.state.edit.id}
                                    name={this.state.edit.name}
                                   difficulty={this.state.edit.difficulty}
                                   duration={this.state.edit.duration}
                                   onClose={this._onRequestForEditQuestClose}
                                   onSubmit={this._onEditQuest}/>
        } else if (this.state.completeQuest){
            modal = <CompleteModal onClose={this._onRequestForDeleteClose}
                                     email={this.state.delete.email}
                                     onSubmit={this._onDeleteUser} />
        }
        return(
        <Box colorIndex={AppSettings.backgroundColor} full="horizontal">
            <Tiles fill={true}>
            {this._renderCards()}
            </Tiles>
            {modal}
        </Box>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('quests');
    Meteor.subscribe('subQuests');
    return {
        quests: Quest.find({}).fetch(),
        subQuest: SubQuest.find({}).fetch()
    }
}, QuestsScreen);