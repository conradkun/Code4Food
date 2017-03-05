import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
Meteor.methods({
    'addGold': function (amount) {
        Meteor.users.update(this.userId, {$set: {"profile.gold": Math.round(gold + amount)}});
    }
});
