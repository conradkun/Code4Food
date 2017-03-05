/**
 * Created by justin on 04/03/17.
 */
import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Add from 'grommet/components/icons/base/Add';
import Edit from 'grommet/components/icons/base/Edit';
import Clock from 'grommet/components/icons/base/Clock';
import Tools from 'grommet/components/icons/base/Tools';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Title from 'grommet/components/Title';
import Heading from 'grommet/components/Heading';


import Card from 'grommet/components/Card';
export default class SubQuestCard extends Component{
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
    render(){
        let {id, name, difficulty, duration, completed} = this.props;
        let completedButton;
        if ( completed==false ){
            completedButton = (
                <Anchor icon={<Checkmark />}
                        onClick={()=>{Meteor.call('completeSubQuest', id)}}
                        primary={true}
                        animateIcon={true} />
            )
        }

        let header = (
            <Header>
                <Heading strong={false}
                         tag='h4' className={completed ? "text-line-trough" : null}>
                    {name}
                </Heading>
                <Box
                    flex={true}
                    justify='end'
                    align="center"
                    pad={{between: "small"}}
                    direction='row'>
                    <Clock colorIndex={this.getColor(duration)}/>
                    <Tools colorIndex={this.getColor(difficulty)}/>
                    {completedButton}
                </Box>
            </Header>
        );
        return (
            <Card basis="full" className="subQuest" colorIndex="light-1" key={this.props.name} heading={header}
            />
        )
    }
}