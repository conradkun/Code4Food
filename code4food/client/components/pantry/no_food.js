
import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';


export default class NoFood extends Component{
    render(){
        return (
            <Box pad="large" alignContent="center" align="center" alignSelf="center" justify="center">

                <Heading uppercase={true}
                         tag='h2'>
                    You don't have any items in your Pantry :(
                </Heading>
                <Paragraph>You have to create at least 5 items in your pantry before using Code 4 Food</Paragraph>
            </Box>
        )
    }
}
