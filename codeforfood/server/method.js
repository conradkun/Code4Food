import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
Meteor.methods({
    'addGold': function (amount) {
        Meteor.users.update(this.userId, {$inc: {"profile.gold": Math.round(amount)}});
    }
});
