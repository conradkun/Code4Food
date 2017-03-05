import {Mongo} from 'meteor/mongo';
import {GetShitDone} from '../get_shit_done';
export const Item = new Mongo.Collection('item');

Meteor.methods({
    'addItem': function ({name, calories}) {
        let id = this.userId;
        return Item.insert({
            user: id,
            name,
            calories
        })
    },
    'eat': function (id) {
        return Item.remove(id);
    }
});
