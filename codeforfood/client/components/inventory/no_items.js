
import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';


export default class NoItems extends Component{
    render(){
        return (
            <Box pad="large" alignContent="center" align="center" alignSelf="center" justify="center">

                <Heading uppercase={true}
                         tag='h2'>
                    You don't have any items in your Inventory :(
                </Heading>
                <Paragraph size="medium">You can buy some in your pantry and you will loot an item when you finish a Quest !!</Paragraph>
            </Box>
        )
    }
}
