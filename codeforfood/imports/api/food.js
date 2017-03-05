import {Mongo} from 'meteor/mongo';
import {GetShitDone} from '../get_shit_done';
export const Food = new Mongo.Collection('food');
import {Item} from './item';

Meteor.methods({
    'addFood': function ({name, calories}) {
        let id = this.userId;
        return Food.insert({
            user: id,
            name,
            calories
        })
    },
    'buy': function (foodId) {
        let food = Food.findOne({_id: foodId});
        if (food.user !== this.userId) {
            throw new Meteor.Error("wrong-user", "this is not the creator of this pantry's item");
        }
        let gold = Meteor.users.findOne({_id : this.userId}).profile.gold;
        if (Math.round(gold - GetShitDone.caloriesToPrice(food._id, Food.find({user: this.userId}).fetch())) > gold) {
            throw new Meteor.Error("not-enough-gold", "you don't have enough gold");
        }
        Meteor.users.update(this.userId, {$set: {"profile.gold": Math.round(gold - GetShitDone.caloriesToPrice(food._id, Food.find({user: this.userId}).fetch()))}});
        Item.insert({
            user: this.userId,
            name: food.name,
            calories: food.calories
        });
        return Food.remove({_id: foodId});
    },
});
