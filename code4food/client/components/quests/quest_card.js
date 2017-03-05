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
import Tools from 'grommet/components/icons/base/Tools';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Tiles from 'grommet/components/Tiles';
import Heading from 'grommet/components/Heading';

import SubQuestCard from './sub_quest_card';
import {SubQuest} from '../../../imports/api/quest';

import Card from 'grommet/components/Card';
class QuestCard extends Component{
    constructor(props){
        super(props);
        this._generateSubQuestList = this._generateSubQuestList.bind(this);
    }
    getColor(status){
        if(status == "High"){
            return 'critical'
        }
        else if(status == "Medium"){
            return 'warning'
        }
        else if(status == "Low"){
            return 'ok'
        }
    }
    _generateSubQuestList(){
        if(this.props.subQuests.filter((subQuest)=>{return subQuest.quest == this.props.id}).length >= 1) {
            console.log(this.props.subQuests.filter((subQuest) => {return (!subQuest.completed && subQuest.quest == this.props.id)}));
            if (this.props.subQuests.filter((subQuest) => {return (!subQuest.completed && subQuest.quest == this.props.id)}).length == 0){
                console.log("bim");
                Meteor.call('completeQuest', this.props.id);
            }
        }
        let cards = this.props.subQuests.filter((subQuest)=>{return subQuest.quest == this.props.id}).map((subQuest) => {
            return <SubQuestCard key={subQuest._id} completed={subQuest.completed} name={subQuest.name} duration={subQuest.duration} difficulty={subQuest.difficulty} id={subQuest._id}/>
        });
        return(
            <Tiles fill={true}>
                {cards}
            </Tiles>
        )
    }
    render(){
        let {id, name, difficulty, duration, completed} = this.props;
        let completedButton;
        if ( completed==false ){
            completedButton = (
                <Anchor icon={<Checkmark />}
                        onClick={()=>{Meteor.call('completeQuest', id); Meteor.call('completeAllSubQuest', id)}}
                        primary={true}
                        animateIcon={true} />
            )
        }
        let header = (
            <Header>
                <Heading strong={true} className={completed ? "text-line-trough" : null}
                         tag='h2'>
                    {name}
                </Heading>
                <Box
                    flex={true}
                    justify='end'
                    align="center"
                    pad={{between: "medium"}}
                    direction='row'>
                    <Anchor icon={<Clock colorIndex={this.getColor(duration)}/>}
                            className={'color-override-'+this.getColor(duration)}
                            label={duration}
                            animateIcon={false}
                            reverse={false}

                            disabled={false} />
                    <Anchor icon={<Tools colorIndex={this.getColor(difficulty)}/>}
                            className={'color-override-'+this.getColor(difficulty)}
                            label={difficulty}
                            animateIcon={false}
                            reverse={false}

                            disabled={false} />
                    <Anchor icon={<Add />}
                            onClick={()=>{if(completed==false) {this.props.onAddSubQuest(id)}}}
                            disabled={completed}
                            animateIcon={true}
                            primary={true}
                            />
                    <Anchor icon={<Edit />}
                            onClick={()=>{if(completed==false) {this.props.onEditQuest({id, name, difficulty, duration})}}}
                            disabled={completed}
                            primary={true}
                            animateIcon={true} />
                    {completedButton}


                </Box>
            </Header>
        );
        return (
            <Card className={completed ? "low-opacity" : null}basis="full" margin="medium" colorIndex="light-1" pad="small" key={this.props.name} heading={header}
                  description={this._generateSubQuestList()}
            />
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('subQuests');
    return {
        subQuests: SubQuest.find({}).fetch()
    }
}, QuestCard);