/**
 * Created by justin on 01/02/17.
 */

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Quest, SubQuest } from '../imports/api/quest';
import { Food } from '../imports/api/food';
import { Item } from '../imports/api/item';

Meteor.publish("quests", function() {
    return Quest.find({user: this.userId});
});

Meteor.publish("subQuests", function() {
    return SubQuest.find({user: this.userId});
});

Meteor.publish("foods", function () {
    return Food.find({user: this.userId});
});

Meteor.publish("items", function () {
    return Item.find({user: this.userId});
});