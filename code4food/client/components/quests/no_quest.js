
import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';


export default class NoQuest extends Component{
    render(){
        return (
            <Box pad="large" alignContent="center" align="center" alignSelf="center" justify="center">

                <Heading uppercase={true}
                         tag='h2'>
                    You don't have any tasks :(
                </Heading>
            </Box>
        )
    }
}