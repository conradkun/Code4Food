import { Meteor } from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import { Roles } from 'meteor/alanning:roles';

/**
Meteor.users.deny(
    {
        update: function () {
                return true;
            },

    });
**/
Accounts.config({
    forbidClientAccountCreation: false
});

