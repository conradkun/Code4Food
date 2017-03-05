import React, {Component} from 'react';
import Box from "grommet/components/Box";
import Fade from 'react-fade'


export default class Loading extends Component{
    render(){
        return (
            <Box full={true} align="center" alignSelf="center" alignContent="center" justify="center">
                <img src="/Loader2.gif"/>
            </Box>
        )
    }
}