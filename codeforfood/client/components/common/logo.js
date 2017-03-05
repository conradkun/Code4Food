import React, {Component} from 'react';
import Box from 'grommet/components/Box';

export default class Logo extends Component{
    render(){
        return (
        <Box>
            <img className="logo" src="/Logo.png"></img>
        </Box>
        )
    }
}
