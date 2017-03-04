//Importing Style
import 'grommet/grommet.min.css';
//Importing Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import Spinner from 'react-spinkit';

Meteor.startup(() => {
    Bert.defaults = {
        hideDelay: 4000,
    };
    /**
     * Make sure that the user is completly logged before any interaction
     */
    let element = document.getElementById('content');
    ReactDOM.render(<Spinner spinnerName='double-bounce'/>, element);
    Tracker.autorun(function (c) {
        if(!Meteor.userId() && !Meteor.loggingIn()){
            init();
            c.stop();
        }
        let me = Meteor.users.findOne({_id: Meteor.userId()});
        if(me){
            init();
            c.stop();
        }
    });
});


function init() {
    let element = document.getElementById('content');
    ReactDOM.render(Routes, element)
}
