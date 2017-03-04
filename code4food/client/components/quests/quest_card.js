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
    _generateSubQuestList(){
        console.log(this.props.subQuests);
        let cards = this.props.subQuests.filter((subQuest)=>{return subQuest.quest == this.props.id}).map((subQuest) => {
            console.log("passed");
            return <SubQuestCard key={subQuest._id} completed={subQuest.completed} name={subQuest.name} duration={subQuest.duration} difficulty={subQuest.difficulty} id={subQuest._id}/>
        });
        return(
            <Tiles fill={true}>
                {cards}
            </Tiles>
        )
    }
    render(){
        let {id, name, difficulty, duration} = this.props;
        let header = (
            <Header>
                <Heading strong={true}
                         tag='h2'>
                    {name}
                </Heading>
                <Box
                    flex={true}
                    justify='end'
                    align="center"
                    pad={{between: "medium"}}
                    direction='row'>
                    <Anchor icon={<Clock />}
                            label={duration}
                            animateIcon={true}
                            reverse={false}
                            primary={false}
                            disabled={false} />
                    <Anchor icon={<Tools />}
                            label={difficulty}
                            animateIcon={true}
                            reverse={false}
                            primary={false}
                            disabled={false} />
                    <Anchor icon={<Add />}
                            onClick={()=>{this.props.onAddSubQuest(id)}}
                            animateIcon={true}
                            primary={true}
                            />
                    <Anchor icon={<Edit />}
                            onClick={()=>{this.props.onEditQuest({id, name, difficulty, duration})}}
                            primary={true}
                            animateIcon={true} />

                </Box>
            </Header>
        );
        return (
            <Card basis="full" margin="medium" colorIndex="light-1" pad="small" key={this.props.name} heading={header}
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